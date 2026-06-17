<?php

namespace App\Filament\Resources\FacilityReports;

use App\Filament\Resources\FacilityReports\Pages\CreateFacilityReport;
use App\Filament\Resources\FacilityReports\Pages\EditFacilityReport;
use App\Filament\Resources\FacilityReports\Pages\ListFacilityReports;
use App\Filament\Resources\FacilityReports\Schemas\FacilityReportForm;
use App\Filament\Resources\FacilityReports\Tables\FacilityReportsTable;
use App\Models\FacilityReport;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FacilityReportResource extends Resource
{
    protected static ?string $model = FacilityReport::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentCheck;

    protected static string|\UnitEnum|null $navigationGroup = 'Warehouse Activity';

    public static function form(Schema $schema): Schema
    {
        return FacilityReportForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FacilityReportsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFacilityReports::route('/'),
            'create' => CreateFacilityReport::route('/create'),
            'edit' => EditFacilityReport::route('/{record}/edit'),
        ];
    }
}