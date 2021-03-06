define(['utils/appFunc','utils/xhr','view/module','GS','i18n!nls/lang'],function(appFunc,xhr,VM,GS,i18n){

    var loginCtrl = {

        init: function(){
            log('signupCtrl')
            var bindings = [{
                element: '.login-btn-register',
                event: 'click',
                handler: loginCtrl.loginSubmit
            }];

            VM.module('loginView').init({
                bindings:bindings
            });
        },

        loginSubmit: function(){
            var loginName = $$('input.register-name').val();
            var password = $$('input.register-password').val();
            var username = $$('input.register-username').val();
            if(loginName === '' || password === ''){
                hiApp.alert(i18n.login.err_empty_input);
//            }else if(!appFunc.isEmail(loginName)){
//                hiApp.alert(i18n.login.err_illegal_email);
            }else{
                hiApp.showPreloader(i18n.login.login);
//                'name' => $_POST['name'],
//                    'pass' => $_POST['pass'],
//                    'mail' => $_POST['mail'],
//
//                    //'pass1' => 'user1',
//                    'status' => '1',
//                    'field_user_display_name[und][0][value]' => "wat",
//                    'field_user_display_name[und][0][format]' => NULL,
//                    'field_user_display_name[und][0][safe_value]' => "wat",
/**/
                $.ajax({
                    url: "http://connectsocial.si/drupaltest/ajax/createUser.php",
                    type: "post",
                    dataType: "json",
                    data: {"name":username,"pass":password, "email": loginName},
                    success: function(data){
                        log(data)
                        if(!data.uid){
                            hiApp.hidePreloader();
                            //napačni vhodni podatki
                            log('napačni login podatki');
                            hiApp.alert('Prišlo je do napake pri registraciji, prosimo preverite vnešene podatke.', 'Napaka');
                            $$('.signup-input-content').find('input').css('border', '1px solid red');
                            return false;
                        }
                        //GS.setCurrentUser(password,data.user);
                        hiApp.hidePreloader();
                        $$('input.register-name, input.register-password, input.register-username').val('');
                        //mainView.loadPage('index.html');
                        $$('.signup-input-content').find('input').css('border', '0');
                        hiApp.alert('Uporabnik je uspešno registriran. Sedaj se lahko prijavite.', 'Uspeh');
                    },
                    error: function(e,p,m){
                        hiApp.alert("Preverite vnešeno uporabniško ime in geslo ter poizkusite znova!", "Napaka");
                        hiApp.hidePreloader();
                        console.log(e)
                        console.log(p)
                        console.log(m)
                    }
                });
            }
        }

    };

    return loginCtrl;
});