
function convertFlag(language) {
    switch (language) {
        case "German":
            return "🇩🇪";
        case "French":
            return "🇲🇫";
        case "Esperanto":
            return "🏴‍☠️";
        case "Spanish":
            return "🇪🇦";
        case "Russian":
            return "🇷🇺";
        case "Italian":
            return "🇮🇹";
        case "Japanese":
            return "🇯🇵";
        case "Portuguese":
            return "🇵🇹";
        case "Dutch":
            return "🇳🇱";
        default:
            return "🇬🇧";
    }
}

export default convertFlag
