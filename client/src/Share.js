import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

export default function Share({ permalink_url }) {
    return (
        <div className="share-container">
            <p>Share the track!</p>
            <div className="share-buttons">
                <FacebookShareButton url={permalink_url}>
                    <FacebookIcon
                        round="true"
                        width="50"
                        height="50"
                    ></FacebookIcon>
                </FacebookShareButton>
                <EmailShareButton url={permalink_url}>
                    <EmailIcon round="true" width="50" height="50"></EmailIcon>
                </EmailShareButton>
                <TelegramShareButton url={permalink_url}>
                    <TelegramIcon
                        round="true"
                        width="50"
                        height="50"
                    ></TelegramIcon>
                </TelegramShareButton>
                <TumblrShareButton url={permalink_url}>
                    <TumblrIcon
                        round="true"
                        width="50"
                        height="50"
                    ></TumblrIcon>
                </TumblrShareButton>
                <TwitterShareButton url={permalink_url}>
                    <TwitterIcon
                        round="true"
                        width="50"
                        height="50"
                    ></TwitterIcon>
                </TwitterShareButton>
                <WhatsappShareButton url={permalink_url}>
                    <WhatsappIcon
                        round="true"
                        width="50"
                        height="50"
                    ></WhatsappIcon>
                </WhatsappShareButton>
            </div>
        </div>
    );
}
