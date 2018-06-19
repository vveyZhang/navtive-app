import { StyleSheet } from 'react-native'


export const menuStyles=StyleSheet.create({
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
        display:"none"
    },
    menuSelectItem: {
        paddingHorizontal: 15,
        paddingVertical:10
    },
    condition: {
        fontSize: 13,
        color: '#585c64',
        lineHeight: 15,
    },
})