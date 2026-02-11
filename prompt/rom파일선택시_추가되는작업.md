# rom 파일 선택시, 추가되는 작업

## onLoadFirmware() 에서 선택된 파일의 확장자가 rom 인 경우

- _cb_progress_fw_copy() 을 통해 파일 복사가 완료되면,
- device_update_set_parameter() 호출 전에,
- TgRom class 의 tg_rom_load_header()를 이용해서, 선택된 rom 파일의 헤더를 읽고,
- TgRom class 의 tg_rom_get_item()를 이용해서, 선택된 rom 파일의 모든 item(firmware)의 item index, itemm model, item version, update condition 을 리스트로 대화 상자에 표시 하고,
- TgRom class 의 tg_rom_get_updatable_item_index() 를 이용해 얻은 item index 값이 0보다 크거나 같은 경우, 리스트에서 기본값으로 선택하고, 대화상자 상단에 "호환성 있는 firmware 를 찾았다"고 영어로 표시함.
  - 사용자가 기본값으로 선택한 item 을 선택하면, 기존 코드 처럼 device_update_set_parameter() 를 호출하여, fw update 를 시작함.
  - 사용자가 기본값 외의 item 을 선택하면, "호환성 없는 firmware 를 진짜 다운로드 할 것인지" 영어로 물어보고, 계속하겠다고 사용자가 확인 하면, 기존 코드 처럼 device_update_set_parameter() 를 호출하여, fw update 를 시작함.

## onLoadFirmware() 에서 선택된 파일의 확장자가 rom 이 아닌 경우

- _cb_progress_fw_copy() 을 통해 파일 복사가 완료되면,
- device_update_set_parameter() 호출 전에,
- "호환성 없는 firmware 를 진짜 다운로드 할 것인지" 영어로 물어보고, 계속하겠다고 사용자가 확인 하면, 기존 코드 처럼 device_update_set_parameter() 를 호출하여, fw update 를 시작함,
