<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'identification',
        'dv',
        'company',
        'trade_name',
        'names',
        'address',
        'email',
        'phone',
        'legal_organization_id',
        'tribute_id',
        'identification_document_id',
        'municipality_id',
    ];

    public function legalOrganization()
    {
        return $this->belongsTo(LegalOrganization::class);
    }

    public function tribute()
    {
        return $this->belongsTo(Tribute::class);
    }

    public function identificationDocument()
    {
        return $this->belongsTo(IdentificationDocument::class);
    }

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }
}

