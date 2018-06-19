import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { List, Button } from 'antd-mobile'
import { getProps, container } from '../../../utils/index'
import { connect } from 'react-redux';
import { formatIdcard } from '../../../utils/format'
const ListItem = List.Item;

const Idcard = (props) => {
    const agent = props.agent.agent
    return (<ScrollView>
        <List>
            <ListItem
                extra={<Text style={styles.listContent}>{agent.name}</Text>}
            >
                <Text style={styles.listTile}>姓名</Text>

            </ListItem>
            <ListItem
                extra={<Text style={styles.listContent}>{formatIdcard(agent.id_card)}</Text>}
            >
                <Text style={styles.listTile}>身份证号</Text>

            </ListItem>
            <ListItem
                extra={<Text style={styles.listContent}>{agent.sex ? '男' : '女'}</Text>}
            >
                <Text style={styles.listTile}>性别</Text>
            </ListItem>
            <ListItem
                extra={<Text style={styles.listContent}>{agent.age}</Text>}
            >
                <Text style={styles.listTile}>年龄</Text>
            </ListItem>
        </List>
        <View style={{ marginHorizontal: 10, marginVertical: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: '100%', height: 240 }} source={{ uri: agent.id_card_img_a }} />
            <Image style={{ width: '100%', height: 240, marginTop: 20 }} source={{ uri: agent.id_card_img_b }} />
        </View>
    </ScrollView>)
}
export default connect(getProps('agent'))(Idcard)

const styles = StyleSheet.create({
    listTile: {
        fontSize: 13,
        fontWeight: '200',
        color: "#4a4a4a",
        marginLeft: 7
    },
    listContent: {
        fontSize: 12,
        color: "#7b7d8b",
        fontWeight: '200',
    },
    btn: {
        width: '86%', marginLeft: '7%', marginRight: '7%', padding: 0, height: 40, marginBottom: 40, backgroundColor: "#ff5353", marginTop: 40, alignItems: 'center',
        justifyContent: 'center',
    }

})