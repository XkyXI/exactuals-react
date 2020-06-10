// the badge's color for different transaction status

const STATUS_BADGE = {
    "New": "primary",
    "Processing": "primary",
    "Ready": "info",
    "Delivered": "success",
    "Cancelled": "warning",
    "Error": "danger",
    "Default": "info"
};

export function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export function getScoreColor(score) {
    if (score < 3) return "danger";
    else if (score < 4) return "warning";
    else if (score <= 5) return "success";
    else return "secondary";
}

export function getStatusColor(status) {
    return STATUS_BADGE[status] !== undefined ? STATUS_BADGE[status] : STATUS_BADGE["Default"];    
}
