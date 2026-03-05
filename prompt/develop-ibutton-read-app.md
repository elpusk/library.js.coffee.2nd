# msr reading app 제작

## 작업 순서

1. system event handler 설정.
   1. `elpusk.framework.coffee.set_system_event_handler(_cb_system_event)`
   2. _cb_system_event()는 새로운 장비 추가 또는 open 된 장비 제거 등이 발생 할때 호출되는 콜백함수로 예시는 "예시 코드"에 있음.
2. cf2 클라이언트 session 생성
   1. `let g_coffee = coffee.get_instance().connect("wss",443)`
3. 사용 할 device path 선택
   1. `let list_path = g_coffee.get_device_list("hid#vid_134b&pid_0206&mi_01")`
   2. list_path 중 끝이 "&ibutton" 끝나는 device path 를 선택(s_selected_path)
4. lpu237 class 객체 생성
   1. `let g_lpu237 = new lpu237(s_selected_path)`
5. ctl_lpu237 class 객체 생성
   1. `g_ctl_lpu237 = new ctl_lpu237(g_coffee, g_lpu237)`
6. 사용할 장비를 open
   1. `g_ctl_lpu237.open_with_promise()`
7. 장비에서 기본 정보를 읽어옴.
   1. `g_ctl_lpu237.load_basic_info_from_device_with_promise()`
8. 장비를 i-button reading 대기 상태로 전환
   1. `g_ctl_lpu237.read_ibutton_from_device_with_callback(true,_cb_read_ibutton_done,_cb_read_ibutton_error)`
   2. _cb_read_ibutton_done() 과 _cb_read_ibutton_error() 의 예시는 "예시 코드"에 있음. _cb_read_ibutton_done() 가 호출되면, 장비는 자동적으로 i-button 읽기 대기 상태로 재진입, _cb_read_ibutton_error() 가 호출되면, 장비는 자동적으로 i-button 읽기 대기 종료됨
9. 장비가 i-button reading 대기 상태 중, 대기를 취소하고 싶으면
   1. `g_ctl_lpu237.read_ibutton_from_device_with_callback(false,_cb_stop_ibutton_done,_cb_stop_ibutton_error)`
   2. _cb_stop_ibutton_done() 과 _cb_stop_ibutton_error() 의 예시는 "예시 코드"에 있음. _cb_stop_ibutton_done() 가 호출되면, 장비는 자동적으로 i-button 읽기 대기 상태로 재진입, _cb_stop_ibutton_error() 가 호출되면, 장비는 자동적으로 i-button 읽기 대기 종료됨
10. 더 이상 i-button 를 읽을 필요가 없으면
    1. `g_ctl_lpu237.read_ibutton_from_device_with_callback(false,_cb_stop_ibutton_done,_cb_stop_ibutton_error)` 를 호출하여, 대기 상태 취소.
    2. `g_ctl_lpu237.close_with_promise()` 를 호출해서 장비 close 함.
    3. g_ctl_lpu237, g_lpu237 를 소멸 시킴.
    4. `g_coffee.disconnect()` 를 호출해 cf2 서버와 연결 종료.(session 도 자동 종료)

## 예시 코드

```ts
// system event handler
function _cb_system_event( s_action_code:string,s_data_field:string ){
    do{
        if( typeof s_action_code === 'undefined'){
            continue;
        }

        if( s_action_code === "c"){
            //removed event
            do{
                if( s_data_field.length <= 0 ){
                    continue;
                }
                if( !g_ctl_lpu237 ){
                    continue;
                }
                if( !g_ctl_lpu237.get_device() ){
                    continue;
                }

                for( var i = 0; i<s_data_field.length; i++  ){
                    if( g_ctl_lpu237.get_device().get_path() === s_data_field[i] ){
                        //TODO. remove object, open 된 장비가 hotplug out 됨.
                        g_ctl_lpu237 = null;
                        break;//exit for
                    }
                }//end for
                
            }while(false);
            
        }
        if( s_action_code === "P"){
            //plugged in event
            // TODO. g_coffee.get_device_list("hid#vid_134b&pid_0206&mi_01") 을 호출해서 
            // 새로운 장비 리스트를 얻어, 기존 장비 리스트와 비교해서 새로 추가된 장비를 알수 있음.
            // 현재 사용중인 장비가 제거 된 것이 아니므로 무시 가능한 이벤트.
            continue;
        }
    }while(false);
}

// i-button 가 정상으로 읽거나 카드 읽기 에러가 있을 호출되는  
function _cb_read_ibutton_done( n_device_index:number, s_msg:string ){
    //s_msg always "success"

    do{
        //check  error. 
        if( g_ctl_lpu237.get_device().get_ibutton_error_code() !== 0 ){
            //error. dispaly error code.
            // TODO. g_ctl_lpu237.get_device().get_ibutton_error_code().
            continue;
        }

        //get a key data.
        let s_key = g_ctl_lpu237.get_device().get_ibutton_data();
        if( s_key.length == 0 ){
            //TODO.  현재 key 값이 없음.
        }
        else{
            //TODO. s_key 에 있는 key 데이터를 원하는 곳에 표시
        }
    }while(false)'

    //clear key data of contoller.
    g_ctl_lpu237.get_device().reset_ibutton_data();

    //자동적으로 i-button 읽기 대기 상태로 재진입.
}

// i-button 읽기 대기 중 에러가 발생한 경우.
function _cb_read_ibutton_error( n_device_index:number,event_error:Error){
    // TODO. n_device_index 에 의해 지정된 device 에서 읽기 대기 중 event_error 에러 발생 처리.

    //장비는 자동적으로 i-button 읽기 대기 종료됨
}

function _cb_stop_ibutton_done( n_device_index:number,s_msg:string ){
    // TODO. n_device_index 에 의해 지정된 device 의 읽기 대기 상태 취소됨.
    // s_msg 는 항상 "success" 이므로 무시 가능.
}

function _cb_stop_ibutton_error(n_device_index:number,event_error:Error){
    // TODO. n_device_index 에 의해 지정된 device의 대기상태 취소 중 event_error 에러 발생 처리.
}

```