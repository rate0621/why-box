"use client";

import Link from 'next/link';
import { Menu, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg">
              <Lightbulb className="w-6 h-6 text-white fill-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white">?</span>
              </div>
            </div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              なんでBOX
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: '#top', label: 'ホーム' },
              { href: '#popular', label: '最新の疑問' },
              { href: '#contact', label: 'お問い合わせ' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
