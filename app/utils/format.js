// 替换邮箱字符
export function formatEmail(email) {
    if(!email) return ''
    if (String(email).indexOf('@') > 0) {
        let str = email.split('@'),
            _s = '';
        if (str[0].length > 3) {
            for (var i = 0; i < str[0].length - 3; i++) {
                _s += '*';
            }
        }
        var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
    }
    return new_email
}

// 替换手机字符
export function formatMobile(mobile) {
    if(!mobile) return ''
    mobile=mobile.toString();
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 替换银行卡

export function formatBack(back){
    if(!back) return ''
    back=back.toString();
    return back.replace(/(\d{5})\d{6}(\d{5})/, '$1******$2')
}

// 替换idcart

export function formatIdcard(idcard){
    if(!idcard) return ''
    idcard=idcard.toString();
    return idcard.replace(/^(.{5}).{6}(.{5})/, '$1******$2')
}
