'use client';

import { LogOut } from 'lucide-react';

export function LogoutTab() {
    return (
        <div className="py-[2.5rem] px-[2.5rem] bg-[#FAFAFA] max-w-2xl mx-auto mt-[3rem] border border-[#00000010] rounded-2xl">
            <button 
                className="flex items-center gap-2 text-[#15151580] hover:text-[#151515] transition-colors"
                onClick={() => {
                    // Add logout logic here
                    console.log('Logging out...');
                }}
            >
                <LogOut size={20} />
                Log out
            </button>
        </div>
    );
}