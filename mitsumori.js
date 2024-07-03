(() => {
    "use strict";

    const ANKEN_FIELD_CODE = 'cf_案件ID';
    const MITSUMORI_FIELD_CODE = 'cf_見積ID';
    const STATUS_FIELD_CODE = 'cf_ステータス';

    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show'
    ], (event) => {

        // 案件IDに値が入っていれば自動ルックアップ
        if(event.record[ANKEN_FIELD_CODE].value) {
            event.record[ANKEN_FIELD_CODE]["lookup"] = true;
        }

        // 見積IDは自動採番なので、編集不可にする
        event.record[MITSUMORI_FIELD_CODE].disabled = true;

        return event;

    });

    kintone.events.on([
        'app.record.create.submit.success',
        'app.record.edit.submit.success',
        'app.record.index.edit.submit.success'
    ], (event) => {

        const ankenId = event.record[ANKEN_FIELD_CODE].value;
        const mitsumoriId = event.record[MITSUMORI_FIELD_CODE].value;
        const m_status = event.record[STATUS_FIELD_CODE].value;
        
        if(m_status == "受注") {
            // PUTメソッドでレコードを更新する
            // 案件管理アプリのcf_案件IDをupdateKeyにして
            // 案件管理アプリのcf_ステータスを受注に、cf_受注見積IDをmitsumoriIdに更新
            const putParam = {
                app: 291,
                updateKey: {
                    field: "cf_案件ID",
                    value: ankenId
                },
                record: {
                    cf_ステータス: {
                        value: "受注"
                    },
                    cf_受注見積ID: {
                        value: mitsumoriId
                    }
                }
            };
            
            return kintone.api(kintone.api.url('/k/v1/record.json', true), 'PUT', putParam).then(function(resp) {
                alert("案件管理(案件ID:" + ankenId + ")のステータスを「受注」に更新しました");
            }).catch(function(error) {
                console.error('Error fetching record:', error);
            });
        }

        return event;

    });

})();