
import React from 'react';

import {
    Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Image, FlatList,
    ActivityIndicator,
} from 'react-native';

import { SearchBar } from 'antd-mobile';

import { ShopItem } from './shop.item';

import { connect } from 'react-redux';

import { getProps, NavigationActions, getPropsWithLoading, barHeight } from '../../utils/index';

import { LoadingFooter } from '../loading.footer'

class Shop extends React.Component {
    componentWillMount() {
        this.props.dispatch({ type: 'goods/queryGoods' });
    }
    renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View style={{ marginVertical: 10 }}>
                <ActivityIndicator />
            </View>);
        }
        return <View style={{ marginVertical: 10 }} />;;
    }
    // this.props.dispatch(NavigationActions.navigate({routeName:'search'}))
  
    render() {
        const product = this.props.goods.product||[];
        const loading = this.props.loading == undefined ? false : this.props.loading;
        return (
            <View style={{ backgroundColor: '#f3f5f9', height: '100%', paddingTop: barHeight }}>
                <View style={{ paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ borderRadius: 16, flex: 1, overflow: 'hidden' }}>
                        <TextInput onFocus={()=>{}} clearButtonMode='never' placeholder='sreach' underlineColorAndroid='transparent' style={styles.search} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#585c64', marginLeft: 12 }}>取消</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.menuSelect}>
                        <View style={styles.menuSelectItem} >
                            <Text style={styles.condition}>条件一</Text>
                        </View>
                        <View style={styles.menuSelectItem} >
                            <Text style={styles.condition}>条件一</Text>
                        </View>
                    </View>
                    <View style={styles.menuBar}>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <View style={styles.menuItem}><Text style={[styles.menuName]}>综合筛选</Text><View style={[styles.icon, styles.bottomIcon]}></View></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <View style={styles.menuItem}><Text style={[styles.menuName]}>价格</Text>
                                <View>
                                    <View style={[styles.icon, styles.topIcon]}></View>
                                    <View style={[styles.icon, styles.bottomIcon]}></View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <View style={styles.menuItem}><Text style={[styles.menuName]}>销量</Text>
                                <View>
                                    <View style={[styles.icon, styles.topIcon]}></View>
                                    <View style={[styles.icon, styles.bottomIcon]}></View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <FlatList
                    onRefresh={() => {
                        this.props.dispatch({ type: 'goods/queryGoods' });
                    }}
                    refreshing={false}
                    ListFooterComponent={<LoadingFooter hidden={product.length <= 0} isAll={true} />}
                    style={{ backgroundColor: '#fff' }}
                    data={filterProduct(product)}
                    renderItem={({ item }) => <ShopItem goods={item} key={item.product_id} toGoods={() => this.props.dispatch(NavigationActions.navigate({
                        routeName: 'goodsDtails', params: {
                            id: item.product_id,
                            name: item.name
                        }
                    }))} />}

                />
            </View>
        )
    }
}
function filterProduct(product) {
    const newProduct = []
    for (let item of product) {
        newProduct.push({
            key: item.product_id,
            ...item
        })
    }
    return newProduct;
}
export default connect(getPropsWithLoading('goods'))(Shop)


const styles = StyleSheet.create({
    search: {
        backgroundColor: '#fff',
        fontSize: 14,
        height: 32,
        color: '#585c64',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    menuBar: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20
    },
    menuName: {
        color: '#585c64',
        fontSize: 14,
        marginRight: 6
    },
    icon: {
        borderWidth: 3,
        borderColor: 'transparent',
        marginVertical: 1
    },
    bottomIcon: {
        borderBottomWidth: 0,
        borderTopColor: '#585c64'
    },
    topIcon: {
        borderTopWidth: 0,
        borderBottomColor: '#585c64'
    },
    menuSelect: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 300,
        display: "none"
    },
    menuSelectItem: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    condition: {
        fontSize: 13,
        color: '#585c64',
        lineHeight: 15,
    },
})