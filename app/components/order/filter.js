



export function filterOrderStatus(status) {
    switch (status) {
        case 1:
            return ' 待付款';
        case 2:
            return ' 待审核';
        case 3:
            return ' 待发货';
        case 4:
            return ' 待发货';
        case 5:
            return ' 待收货';
        case 6:
            return ' 已完成';
        case 7:
            return ' 已关闭';
        case 8:
            return ' 已删除';
    }
}

export function getTotal(items) {
    let total = 0;
    for (let key of items) {
        total += key.count
    }
    return total;
}

export function filterOrderType(type){
    switch (type) {
        case 1:
            return ' 采购';
        case 2:
            return ' 取货';
        case 3:
            return ' 销售';
    }
}
export function filterGoodsStatus(type){
    switch (type) {
        case 1:
            return '销售中';
        case 2:
            return '已下架';
        case 3:
            return '已删除';
    }
}
