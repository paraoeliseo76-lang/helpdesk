<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        if ($user->tickets()->count() === 0) {
            $user->tickets()->createMany([
                ['title' => 'Printer not working', 'description' => 'Office printer shows offline on all PCs.', 'priority' => 'High', 'status' => 'Open', 'category' => 'Hardware'],
                ['title' => 'Cannot access VPN', 'description' => 'VPN client fails with timeout error since morning.', 'priority' => 'Urgent', 'status' => 'In Progress', 'category' => 'Network'],
                ['title' => 'Install design software', 'description' => 'Need Figma installed on the marketing laptop.', 'priority' => 'Low', 'status' => 'Resolved', 'category' => 'Software'],
            ]);
        }
    }
}
