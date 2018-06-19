class goodsStore {
    goods = [];
    findGoods = (items) => {
        return items.map(key => {
            for (let i of this.goods) {
                console.log(key.ProductID)
                if (i.product_id == key.ProductID) {
                    return {
                        product: i,
                        count: key.Count
                    }
                }
            }
            return []
        })

    };

    updataGoods = (goods) => {
        this.goods = goods;
    }
}

export default new goodsStore()