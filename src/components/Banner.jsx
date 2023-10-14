const Banner = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">
                        Connecting You with Tech Experts
                    </h1>
                    <p className="mb-5 text-lg text-center">
                        ExpertLink is your gateway to tech expertise. Connect
                        with a diverse range of experts, including video
                        editors, script writers, system administrators, and
                        more. Get tailored consultations, collaborate, and
                        enhance your tech projects. Join ExpertLink today!
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;