export default function ProofSection() {
    return (
        <>
            <section className='py-12 px-6 border-y border-gray-200 dark:border-[#30363d] bg-gray-50/50 dark:bg-[#161B22]/30'>
                <div className='container mx-auto max-w-7xl'>
                    <p className='text-center text-sm text-gray-500 dark:text-gray-500 mb-6'>
                        Utilisé par des organisations de confiance
                    </p>
                    <div className='flex flex-wrap items-center justify-center gap-12 opacity-60'>
                        <div className='text-gray-400 dark:text-gray-600'>CNRS</div>
                        <div className='text-gray-400 dark:text-gray-600'>LPO</div>
                        <div className='text-gray-400 dark:text-gray-600'>INRAE</div>
                        <div className='text-gray-400 dark:text-gray-600'>{"Museum d'Histoire Naturelle"}</div>
                        <div className='text-gray-400 dark:text-gray-600'>ONF</div>
                    </div>
                </div>
            </section>
        </>
    );
}
