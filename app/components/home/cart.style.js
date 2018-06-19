
import { StyleSheet } from 'react-native';

import { barHeight } from '../../utils/index'

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#f3f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 10,
        marginTop: barHeight,
    },
    btnContainer: {
        height: 54,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: '0%',
        left: 0,
        borderTopColor: 'rgba(0, 0, 0, 0.25)',
        borderTopWidth: 1,
        marginTop:15
    },
    btn: {
        width: 140,
        borderRadius: 3,
        color: '#fff',
        fontSize: 14,
        backgroundColor: "#ff4444",
        marginRight: 10,
        textAlign: 'center',
        lineHeight: 14,
        paddingVertical: 13
    }
})