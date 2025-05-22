<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'identification' => 'required|string|max:20',
            'dv' => 'nullable|string|max:5',
            'company' => 'nullable|string|max:255',
            'trade_name' => 'nullable|string|max:255',
            'names' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',

            'legal_organization_id' => 'required|exists:legal_organizations,id',
            'tribute_id' => 'required|exists:tributes,id',
            'identification_document_id' => 'required|exists:identification_documents,id',
            'municipality_id' => 'required|exists:municipalities,id',
        ];
    }

}
