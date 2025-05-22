<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Municipality;
use App\Models\Tribute;
use App\Models\LegalOrganization;
use App\Models\IdentificationDocument;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
       
        // dd(request()->all());
        return Inertia::render('Customers/Index', [
            'customers' => Customer::with(['municipality', 'tribute', 'legalOrganization', 'identificationDocument'])
                ->orderBy('id', 'desc')
                ->paginate(10)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Customers/Create', [
            'municipalities' => Municipality::all(),
            'tributes' => Tribute::all(),
            'legalOrganizations' => LegalOrganization::all(),
            'identificationDocuments' => IdentificationDocument::all(),
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        Customer::create($request->validated());

        return redirect()->route('customers.index')->with('success', 'Cliente creado correctamente.');
    }

    public function edit(Customer $customer): Response
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer->load(['municipality', 'tribute', 'legalOrganization', 'identificationDocument']),
            'municipalities' => Municipality::all(),
            'tributes' => Tribute::all(),
            'legalOrganizations' => LegalOrganization::all(),
            'identificationDocuments' => IdentificationDocument::all(),
        ]);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return redirect()
            ->route('customers.index', $customer)
            ->with('success', 'Cliente actualizado correctamente.');
    }


    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Cliente eliminado correctamente.');
    }
}
