<?php

namespace App\Helpers;

class PaymentHelper
{
    public static function paymentMethods(): array
    {
        return [
            ['code' => '10', 'name' => 'Efectivo'],
            ['code' => '42', 'name' => 'Consignación'],
            ['code' => '20', 'name' => 'Cheque'],
            ['code' => '47', 'name' => 'Transferencia'],
            ['code' => '71', 'name' => 'Bonos'],
            ['code' => '72', 'name' => 'Vales'],
            ['code' => '1',  'name' => 'Medio de pago no definido'],
            ['code' => '49', 'name' => 'Tarjeta Débito'],
            ['code' => '48', 'name' => 'Tarjeta Crédito'],
            ['code' => 'ZZZ', 'name' => 'Otro*'],
            
        ];
    }

    public static function paymentFormCodes(): array
    {
        return [
            ['code' => '1', 'name' => 'Pago de contado'],
            ['code' => '2', 'name' => 'Pago a crédito'],
        ];
    }
}
