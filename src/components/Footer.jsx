import Logo from './Logo';

function Footer() {
    return (
        <section className="relative py-1 bg-[#2D7D64] border-t-2 border-[#E8E8E8] h-[20vh] w-full overflow-y-hidden">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo Section */}
                    <div className="w-full md:w-1/4 p-4">
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-2">
                                <Logo width="100px" />
                            </div>
                            <p className="text-sm text-[#E8E8E8] mt-2">
                                &copy; 2024. All Rights Reserved by FinSavy.
                            </p>
                        </div>
                    </div>
                    </div>
                    </div>
            
        </section>
    );
}

export default Footer;
