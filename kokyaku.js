(() => {
    "use strict";

    const KOKYAKU_FIELD_CODE = 'cf_顧客ID';

    kintone.events.on([
      'app.record.create.show',
      'app.record.edit.show',
      'app.record.index.edit.show'
    ], (event) => {

        // 顧客IDは自動採番なので、編集不可
        event.record[KOKYAKU_FIELD_CODE].disabled = true;

    });

})();