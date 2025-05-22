<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'code_reference' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'price' => 'required|numeric|min:0',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'unit_measure_id' => 'required|exists:unit_measures,id',
            // 'standard_code_id' => 'required|integer', // según cómo tengas esta tabla
            'is_excluded' => 'required|boolean',
            'tribute_id' => 'required|exists:product_tributes,id',
        ];
    }
}
