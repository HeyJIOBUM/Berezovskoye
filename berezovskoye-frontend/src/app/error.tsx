'use client';

export default function Error() {
    const handleErrorReset = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="border border-red-400 bg-red-100 p-4 text-red-700">
                <h2 className="mb-4 text-lg font-bold">
                    Что-то пошло не так!
                </h2>
                <button
                    onClick={handleErrorReset}
                    className="base-button bg-delete"
                >
                    Попробовать снова
                </button>
            </div>
        </div>
    );
}