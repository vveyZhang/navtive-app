import React from 'react';
import {View,Image,Text,StyleSheet,TouchableHighlight} from 'react-native'
import card1 from '../../res/images/id_1.jpg';
import card2 from '../../res/images/id_2.jpg';
import {uploadPic} from './uploadPic';
export const IdCard=(props)=>{
    return(<View style={{alignItems:'center'}}>
        <View>
        <Text style={styles.tips}>拍摄您的二代身份证原件，请确保图片清晰。</Text>
         </View>
         <View style={styles.pic}>
             <TouchableHighlight onPress={()=>uploadPic(props.getid_cardA,{
                 width:400,
                 height:300
             })}>
             <Image
                    style={{ width: 200, height: 112 }}
                    source={props.info.id_card_img_a?{uri:props.info.id_card_img_a}:card1}
                />
             </TouchableHighlight>
         
         </View>
         <View style={styles.pic}>
             <TouchableHighlight onPress={()=>uploadPic(props.getid_cardB,{
                 width:400,
                 height:300
             })}>
             <Image
                    style={{ width: 200, height: 112 }}
                    source={props.info.id_card_img_b?{uri:props.info.id_card_img_b}:card2}
                />
             </TouchableHighlight>
         
         </View>
    </View>)
}
const styles=StyleSheet.create({
    tips:{
        color:'#4a4a4a',
        fontSize:12,
    },
    pic:{
        marginTop:30
    }
})