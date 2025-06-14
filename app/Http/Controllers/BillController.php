<?php

namespace App\Http\Controllers;

use App\Helpers\PaymentHelper;
use App\Models\Customer;
use App\Models\Product;
use App\Services\FactusService;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

use function Pest\Laravel\json;

class BillController extends Controller
{
    protected $factusService;

    public function __construct(FactusService $factusService)
    {
        $this->factusService = $factusService;
    }

    public function index(Request $request)
    {
        try {
            $page = $request->get('page', 1);
            $number = $request->input('filter.number');

            // Construir el arreglo de parámetros para el request al API
            $params = ['page' => $page];

            if (!empty($number)) {
                $params['filter[number]'] = $number;
            }

            $response = $this->factusService->request('get', 'v1/bills', $params);

            if (!$response->successful()) {
                throw new \Exception('Error al obtener las facturas: ' . $response->json()['message']);
            }

            $result = $response->json();

            $bills = $result['data']['data'] ?? [];
            // dd($bills);
            $pagination = $result['data']['pagination'] ?? [];

            return Inertia::render('Factus/Bills/Index', [
                'bills' => $bills,
                'pagination' => $pagination,
                'filters' => [
                    'number' => $number,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Factus/Bills/Index', [
                'bills' => [],
                'pagination' => [],
                'error' => $e->getMessage(),
                'filters' => [
                    'number' => $request->input('filter.number'),
                ],
            ]);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Factus/Bills/Create', [
                'customers' => Customer::all(),
                'products' => Product::all(),
                'paymentForm' => PaymentHelper::paymentFormCodes(),
                'paymentMethodCode' => PaymentHelper::paymentMethods(),
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Factus/Bills/Index', [
                'bills' => [],
                'pagination' => [],
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function show($number)
    {
        try {
            $response = $this->factusService->request('get', "v1/bills/show/{$number}");

            if (!$response->successful()) {
                throw new \Exception('Error al obtener la factura: ' . $response->json()['message']);
            }

            $result = $response->json();
            //  dd($result['data']['bill']);
            if ($result['data']['bill']['validated'] == null) {
                throw new \Exception('Factura Rechazada: ' . $result['data']['bill']['errors'][0]);
            }
            // dd($result['data']['bill']);
            return Inertia::render('Factus/Bills/Show', [
                'bill' => $result['data'],
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function store(Request $request)
    {

        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'items' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:0',
            'products.*.price' => 'required|numeric|min:0',
            'payment_form' => 'required|string|max:50',
            'payment_method_code' => 'required|string|max:50',
        ]);
        try {
            // dd($request->all());

            $customer = Customer::find($request->input('customer_id'));
            if (!$customer) {
                return redirect()->back()->withErrors(['customer_id' => 'El cliente no existe.']);
            }

            $customerData = [
                'identification_document_id' => $customer->identification_document_id,
                'identification' => $customer->identification,
                'legal_organization_id' => $customer->legal_organization_id,
                'tribute_id' => $customer->tribute->code,
                'municipality_id' => $customer->municipality_id,
                'dv' => $customer->dv,
                'names' => $customer->names,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'address' => $customer->address,
            ];

            $items = [];
            foreach ($request->input('items') as $product) {
                $productModel = Product::find($product['product_id']);
                if (!$productModel) {
                    throw new \Exception('El producto: ' .$product['product_id'] . ' no existe.');
                }
                $items[] = [

                    'code_reference' => $productModel->code_reference,
                    'name' => $productModel->name,
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    'discount_rate' => $productModel->discount_rate,
                    'tax_rate' => $productModel->tax_rate,
                    'unit_measure_id' => $productModel->unitMeasure->code,
                    'is_excluded' => $productModel->is_excluded,
                    'tribute_id' => $productModel->productTribute->code,
                    'standard_code_id' => 1,
                ];
            }

            $resolution = $this->factusService->request('get', 'v1/numbering-ranges', ['filter[id]' => 8]);
            // dd($resolution->json());
            if (!$resolution->successful()) {
                throw new \Exception('Error al obtener la resolución: ' . $resolution->json()['message']);
            }
            $resul = $resolution->json();
            $resolution = $resul['data'][0];
            $referenceCode = $resolution['prefix'] . $resolution['current'];
            // dd($referenceCode);
            // dd($resolution);
            $data = [
                'reference_code' => $referenceCode,
                'customer' => $customerData,
                'items' => $items,
                'payment_form' => $request->input('payment_form'),
                'payment_method_code' => $request->input('payment_method_code'),
                'payment_due_date' => Carbon::now()->format('Y-m-d'),
                'discount_rate' => $request->input('discount_rate'),
                'observation' => $request->input('observations'),
            ];
            // dd($data);


            $response = $this->factusService->request('post', 'v1/bills/validate', $data);
            // dd($response->json());
            if (!$response->successful()) {
                throw new \Exception('Error al crear la factura: ' . $response->json()['message']);
            }

            return redirect()->route('bills.index')->with('success', 'Factura creada correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy($reference_code)
    {
        try {
            $response = $this->factusService->request('delete', "v1/bills/destroy/reference/{$reference_code}");

            if (!$response->successful()) {
                throw new \Exception('Error al eliminar la factura: ' . $response->json()['message']);
            }

            return redirect()->route('bills.index')->with('success', 'Factura eliminada correctamente.');
        } catch (\Exception $e) {
            return redirect()->route('bills.index')->with('error', $e->getMessage());
        }
    }

    public function downloadPdf($number)
    {
        // dd($number);
        try {
            $response = $this->factusService->request('get', "v1/bills/download-pdf/{$number}");

            if (!$response->successful()) {
                throw new \Exception('No se pudo obtener el PDF: ' . $response->json()['message']);
            }

            $result = $response->json();

            $base64 = $result['data']['pdf_base_64_encoded'];
            $fileName = "Factura de venta - {$number}" . ".pdf";

            // Decodifica el contenido base64
            $pdfContent = base64_decode($base64);

            return response($pdfContent, 200)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'inline; filename="' . $fileName . '"');
        } catch (\Exception $e) {

           return redirect()->route('bills.index')->with('error', $e->getMessage());
        }
    }

    public function downloadXml($number)
    {

        try {
            $response = $this->factusService->request('get', "v1/bills/download-xml/{$number}");

            if (!$response->successful()) {
                throw new \Exception('No se pudo obtener el XML: ' . $response->json()['message']);
            }

            $result = $response->json();

            $base64 = $result['data']['xml_base_64_encoded'];
            $fileName = $result['data']['file_name'] . '.xml';

            $xmlContent = base64_decode($base64);

            return response($xmlContent, 200)
                ->header('Content-Type', 'application/xml')
                ->header('Content-Disposition', 'inline ; filename="' . $fileName . '"');
        } catch (\Exception $e) {
            return redirect()->route('bills.index')->with('error', $e->getMessage());
        }
    }
}
