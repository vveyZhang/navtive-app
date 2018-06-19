import { Modal } from 'antd-mobile';

const alert = Modal.alert;

export const confirmReceipt = (fun,id) => {
    const alertInstance = alert('确认收货', '是否确认已收货？', [
        { text: '关闭', onPress: () =>{}, style: 'default' },
        {
            text: '确认', onPress: () => {
                fun(id)
            }
        },
    ]);
}