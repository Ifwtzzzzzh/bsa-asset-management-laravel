<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model {
    protected $fillable = ['user_id', 'asset_id', 'type', 'description', 'status'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function asset(): BelongsTo {
        return $this->belongsTo(Asset::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saved(function ($task) {
            if ($task->status === 'in_progress' && $task->type === 'repair') {
                $task->asset->update(['status' => 'maintenance']);
            }
            elseif ($task->status === 'completed' && $task->type === 'repair') {
                $task->asset->update(['status' => 'available']);
            }
        });
    }
}
