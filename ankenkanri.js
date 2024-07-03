(() => {
    "use strict";

    const ANKEN_FIELD_CODE = 'cf_案件ID';
    const KOKYAKU_FIELD_CODE = 'cf_顧客ID';

    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show'
    ], (event) => {

        // 顧客IDに値が入っていれば自動ルックアップ
        if(event.record[KOKYAKU_FIELD_CODE].value) {
            event.record[KOKYAKU_FIELD_CODE]["lookup"] = true;
        }

        // 案件IDは自動採番なので、編集不可
        event.record[ANKEN_FIELD_CODE].disabled = true;

        return event;

    });

})();