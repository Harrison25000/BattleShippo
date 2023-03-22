import '../css/Hero.css';

export const Hero = ({ image, video, altText }) => {
    return (
        <div className="Hero">
            {video && (
                <video id="heroVideo" playsInline autoPlay muted loop>
                    <source src={video} type="video/mp4" />
                </video>
            )}
            {image && (
                <img id="heroImage" alt={altText} src={image} />
            )
            }
        </div>
    )
}