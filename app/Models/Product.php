<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'code_reference',
        'name',
        'quantity',
        'discount_rate',
        'price',
        'tax_rate',
        'unit_measure_id',
        'standard_code_id',
        'is_excluded',
        'tribute_id'
    ];

    public function unitMeasure()
    {
        return $this->belongsTo(UnitMeasure::class);
    }

    public function productTribute()
    {
        return $this->belongsTo(ProductTribute::class, 'tribute_id');
    }
}
