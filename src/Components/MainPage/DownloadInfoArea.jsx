// import css
import "../../css/MainPageCss/DownloadInfoArea.css";

function DownloadInfoArea({explain, imageSrc}) {
    return (
        <div className="explainContainer">
            <hr />
            <h3>{explain}</h3>
            <img src={imageSrc} />
        </div>
    )
}

export default DownloadInfoArea;