<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller {
    /**
     * Display the login view.
     */
    public function create(): Response {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): \Illuminate\Http\JsonResponse {
        $request->authenticate();
        $request->session()->regenerate();
        $user = Auth::user();

        return response()->json([
            'success' => true,
            'role' => $user->role,
        ]);

        // if ($user->role === 'admin') {
        //     return redirect()->away(url('/admin'));
        // }
        // if ($user->role === 'supervisor') {
        //     return redirect()->away(url('/supervisor'));
        // }
        // if ($user->role === 'client') {
        //     return redirect()->intended(route('client.dashboard', absolute: false));
        // }
        // return redirect()->intended(route('dashboard', absolute: true));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
