'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="text-9xl font-bold">
                    404
                </h1>

                <p className="text-2xl">
                    Упс! Страница, которую вы ищете, не найдена.
                </p>

                <Link
                    href="/products"
                    className="base-button w-fit bg-detail"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}