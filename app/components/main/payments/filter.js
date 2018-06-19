export function filterType(type) {
    switch (type) {
        case 1:
            return "收入";
        case 2:
            return "支出"
        default:
            return ""
    }

}
export function filterCause(type) {
    switch (type) {
        case 1:
            return "购买";
        case 2:
            return "销售";
        case 3:
            return "邀请";
        case 4:
            return "提现"
        case 5:
            return "返点"
        default:
            return " "
    }

}

export function filterStatus(type) {
    switch (type) {
        case 1:
            return "等待处理";
        case 2:
            return "拒绝";
        case 3:
            return "提现中";
        case 4:
            return "提现失败"
        case 5:
            return "提现成功";
        default:
            return ''

    }

}
