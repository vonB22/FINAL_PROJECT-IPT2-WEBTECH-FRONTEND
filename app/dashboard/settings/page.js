'use client'
import React from 'react'

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-neutral-900 text-gray-200">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                        Logout
                    </button>
                </div>

                {/* Settings Sections */}
                <div className="space-y-8">
                    {/* Profile Settings */}
                    <div className="bg-neutral-800/40 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Car Doe"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="car.doe@example.com"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="0912-345-6789"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                            Save Changes
                        </button>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-neutral-800/40 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Username</label>
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Change Email</label>
                                <input
                                    type="email"
                                    placeholder="new.email@example.com"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                            Update Account
                        </button>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-neutral-800/40 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">New Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="mt-1 block w-full rounded-md bg-neutral-700 border border-neutral-600 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                            Update Password
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-neutral-800/40 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
                        <p className="text-sm text-gray-400">
                            Deleting your account will permanently remove all your data. This action cannot be undone.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}