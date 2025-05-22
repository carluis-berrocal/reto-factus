<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',

            'legal_organization_id' => 'nullable|exists:legal_organizations,id',
            'tribute_id' => 'nullable|exists:tributes,id',
            'identification_document_id' => 'nullable|exists:identification_documents,id',
            'municipality_id' => 'nullable|exists:municipalities,id',
        ];
    }

}
