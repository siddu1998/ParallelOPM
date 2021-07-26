var fill = d3.scale.category20()
var data;
// edited for checking if the screenshots
// are displayed or not, initially false
var t=false;
var imagedisplay_id=0;

var node_image_mapper={'d0cd0662-ac0d-4d28-a799-3ed4a0495793': ['Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/1_597bc317-eb45-4090-b81a-b2f4150cfd4e.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/8_1944d25b-378a-4f97-adb3-38bc49858845.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/26_40823cc1-0d6f-440a-b091-0c582e9ef478.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/31_89ddbbcc-9698-4dfa-bd65-0370aa988d22.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/37_6e8c5c6d-7bdf-4388-a05c-d83517b91bf0.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/42_dd708036-369d-48b0-88ff-2599938135e0.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/47_1a7ef348-3d9f-47bb-85c2-dae165a4499c.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/51_894898d0-6d71-4c9d-b970-3a2333bfd86a.png'], '787785b5-e800-45e2-82dd-9001eae092ef': ['Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/1_e48a9ee9-88d9-458a-90f6-310ac1648388.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/6_1bbe52c7-1cbb-4815-a466-de2653227b76.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/22_d922b07d-cf25-445f-93a7-f5d8fdf6a62d.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/27_842b987f-f501-4733-b9eb-cb95bf531308.png'], '64ea8334-1539-4f9c-a5fd-9788528f5c3f': ['Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/1_b92622c7-8d33-4bdf-81f2-d9586f8372fc.png', 'Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/19_ea074978-808c-4154-b9ac-ba2dc7fa3f76.png', 'Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/24_4dd21595-6e47-4d16-a634-b8ef5d557dd9.png'], '0ba55f9b-be6f-4478-b31a-547ea6f64ef4': ['Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/1_0be69300-22b0-4188-8266-a6ddfe5549cb.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/18_2859e968-727c-436a-a5f4-48d238bded39.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/23_2e2e0548-7e61-4be1-85a0-3a0668f3367e.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/30_9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/35_aae671a0-04eb-4fb1-bcaa-74fc435bf802.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/42_d931ace6-beb4-4c79-be1d-1b5bb4fabbc3.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/47_1e01ec66-2765-4820-b808-ffc403bd71cf.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/82_6579a28f-bbf8-40e3-a7b9-7d6d67caec82.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/87_9be107b9-da31-4875-a587-6f2996961b02.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/120_7d37d945-eef1-419a-b3ce-dcc23c031602.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/125_8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/154_1f95841a-7c32-4b5f-a224-d31c8a93bc39.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/159_f1a88354-b996-4e18-8e12-79d971d286ff.png'], '34939330-b4bf-42a6-88b1-294148819974': ['Screenshots/34939330-b4bf-42a6-88b1-294148819974/1_9d24ed0b-7765-4a84-8da6-35780361028c.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/13_5bc4afec-64ca-4ef8-ac03-e32439f346b4.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/18_25a8c409-dae1-4eb7-8a71-e09aa939bda8.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/28_fec18323-9bc0-4250-b27d-43948279ff0e.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/34_19151c6d-778e-451a-a90d-e06821f62cf5.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/44_53167228-d59a-4a84-a524-655f2f989be8.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/49_aa075a9b-6827-488f-b4ba-db492aba8261.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/54_46f77fec-cb8e-4867-b064-13dd4d32846b.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/60_e3811663-3ddd-4226-9ce5-0f09819a5ccc.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/66_834dbb25-5c09-484e-ba56-35b6e561ed26.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/71_0e636362-c9d5-4a93-b0af-40c14379c6dd.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/78_78104501-4d16-467a-8810-3849872c945b.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/83_2261d2f8-8469-43c1-9909-64aafa27e120.png'], '248d368d-232d-46c8-b137-8f81dc77f809': ['Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/1_67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/20_15ff1a2d-5115-4926-9dae-aa2bb176a3b4.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/25_a4d2da66-df19-4e79-8f8f-ca1db6b47d30.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/34_df0f9351-534e-46bf-b43f-ffb9bee275f7.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/39_c92eab9e-1163-418a-9f33-7ced9804a7f0.png'], '5c2947cc-34b1-42ac-864c-3f69f9171c54': ['Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/1_9c5ba07a-af2e-4c6f-b143-b2015b9033ea.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/7_c5d349c1-0f51-4903-84f6-f70b4b018c89.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/16_8760bda7-4f39-4fa6-8d4c-c071eb8cd752.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/21_bdb99255-3195-427b-a479-1e35e51182f3.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/32_56c1b0fa-c47f-4f72-a4a3-3681fd7109d8.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/37_5550e9b4-054a-4c45-9f14-1f9dd95cd1be.png'], '9553b141-533e-4cd7-bb59-5d8f8c56a507': ['Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/1_ffb6595a-86e8-456e-a102-cd20c586accc.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/7_8da1015b-212e-4f0b-a893-9ac91f7b10e7.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/23_6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/30_7583a156-7589-4c3b-bdad-0516cc26caea.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/35_48d32ffd-3087-4a96-9ec6-17ec49a16f1e.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/43_f240de04-55de-43ff-9d4d-23bc48b5eb94.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/48_ae10d27d-25c3-42da-b455-82eca825cc4e.png'], '37023d9a-a8a3-4998-be0e-447962220be0': ['Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/1_fb96c809-f2a2-48d3-860f-f7e86e4d232f.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/16_24b016e4-a817-465d-b658-490a026e406e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/27_0ddcc244-042e-499e-9fe8-47834ed03d2e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/32_db5d8c95-6d1c-4174-8a80-129f2901b244.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/55_b64c9185-1352-4f2e-b7f2-cb59e46aad1e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/61_8e32c003-90c7-4791-8b3a-f83ea484e278.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/63_9c5a2e37-0028-47db-8fa9-3152bbf27c48.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/78_b6210c61-ac25-48fd-94d0-6a570119cf2b.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/89_4f3e618f-88c2-44be-9b9e-bd236dbe11ba.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/117_b32b9a71-7e15-4597-ad73-3ecfdf6718ed.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/124_9e4b48b2-7530-47d6-a4aa-5d49e6a12039.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/132_6b44f318-9f01-4629-837a-546abb75ea30.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/146_114592a7-2914-43c4-860b-dad4523a6c1d.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/151_f28a3846-107b-46f0-aef1-5b17f46ff485.png'], 'b4152ba7-4846-4ba2-93c4-eba434125dbe': ['Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/1_6f797556-6f82-4007-9fab-aca77b4a4da5.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/25_bc676979-9231-4ab6-ac0e-ac7d2232103c.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/30_b3d151d0-959e-47a4-877a-39f27aef64f3.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/36_10937638-c799-4142-9ffc-c701aac99828.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/41_f5ef9996-978a-46ba-ba02-298bd4118722.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/47_28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/52_c1c7e32f-350e-4fa2-9118-9a9b667857c4.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/61_c0801c25-049c-4536-ab8b-8f6a8aa3e87b.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/66_f4c89b24-8b5d-49e0-a2a6-2c0f68897990.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/73_4c67e78c-ec01-42b8-ab49-f074001537e4.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/78_abc3d55c-ae25-47c8-9759-731e018fa416.png'], 'c996d3cd-6f96-4b58-a4f4-60026db0edcc': ['Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/1_b7eccd85-f6be-4f46-9090-58c6eb9e5e5c.png', 'Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/21_1653f60d-aaef-485a-bbff-fd161d5def4c.png', 'Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/26_3d7d46a1-cc46-4a25-a41e-ac323d8fd07f.png'], '4666e412-31ab-421b-b335-b30c7c322bdd': ['Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/1_00cedd67-4118-4bb2-948e-74bef8707793.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/7_ed903e9c-50b4-484d-9eb3-93968f8647a5.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/22_42daf75c-156d-4f40-bf19-54d56edebd2c.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/27_fafd80b7-f84a-4818-bf50-f5c3762967dc.png'], '2e07ba3c-51be-498f-815a-768f3b7cb7e1': ['Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/1_ea5aa89f-e29d-47a8-ae21-abdd11a36442.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/19_8cce4560-586f-4239-a067-f0e2aabd3485.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/28_c987707b-a66b-4466-afde-2638747aa92b.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/33_dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/45_aaea46b2-0137-486b-9cc4-91afe0ccec45.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/52_075b44e9-ef68-4a30-84a1-6895955778a3.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/57_ae7e8247-aafc-486e-857a-f073f1753150.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/63_023a3dd8-f4d1-431d-bb75-58d257e2e39d.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/68_86638d5a-050a-404b-82db-1db04836b4a2.png'], 'e95dfdda-ad84-47c2-8d04-105692208369': ['Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/1_c9b1b4b5-77b1-40be-b264-6a5b10aa1168.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/27_fb5b57f8-b45a-48dd-bcd2-6620081ff987.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/29_4507a496-caba-4ec2-ae8d-007dfe992908.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/48_114f550e-eaf3-4f21-95d3-2286aeafe74d.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/55_313ad2d2-65ff-4484-b975-831adbdd2982.png'], 'ceb929b7-97d0-4d10-89f8-8206ce24e7a5': ['Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/1_6dcee51c-835c-4a34-90d6-92a142f2ab0c.png', 'Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/22_4c68015e-5197-4dc7-9d48-9174a4487703.png', 'Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/27_90db9630-4a01-44a6-80fb-6048768c7dfa.png'], '780fc9bd-794c-4906-9f64-c04d19144e0f': ['Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/1_2a0659af-d883-4d40-9aca-36f1c1eda6af.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/7_f64c6426-1f81-441a-9395-36e14d90c30c.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/25_c0df33f4-bb05-4de1-b648-e94c29292d50.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/31_7c1ab865-ea9c-493a-a28c-596eab63e0bc.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/36_5cb88cc6-29f0-4a38-952d-335f6d84a14e.png']}

var playerStatisticsData ={
      "b4152ba7-4846-4ba2-93c4-eba434125dbe.json": {
            "test_success": 5,
            "test_fail": 0,
            "submit_success": 4,
            "submit_fail": 1,
            "gameplay_duration": 6.0
      },
      "248d368d-232d-46c8-b137-8f81dc77f809.json": {
            "test_success": 2,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 1,
            "gameplay_duration": 3.0
      },
      "34939330-b4bf-42a6-88b1-294148819974.json": {
            "test_success": 6,
            "test_fail": 2,
            "submit_success": 1,
            "submit_fail": 3,
            "gameplay_duration": 7.0
      },
      "37023d9a-a8a3-4998-be0e-447962220be0.json": {
            "test_success": 5,
            "test_fail": 6,
            "submit_success": 0,
            "submit_fail": 1,
            "gameplay_duration": 9.0
      },
      "64ea8334-1539-4f9c-a5fd-9788528f5c3f.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 1.0
      },
      "d0cd0662-ac0d-4d28-a799-3ed4a0495793.json": {
            "test_success": 3,
            "test_fail": 0,
            "submit_success": 3,
            "submit_fail": 0,
            "gameplay_duration": 14.0
      },
      "0ba55f9b-be6f-4478-b31a-547ea6f64ef4.json": {
            "test_success": 6,
            "test_fail": 0,
            "submit_success": 2,
            "submit_fail": 4,
            "gameplay_duration": 14.0
      },
      "2e07ba3c-51be-498f-815a-768f3b7cb7e1.json": {
            "test_success": 3,
            "test_fail": 2,
            "submit_success": 2,
            "submit_fail": 1,
            "gameplay_duration": 6.0
      },
      "787785b5-e800-45e2-82dd-9001eae092ef.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 0,
            "submit_fail": 1,
            "gameplay_duration": 28.0
      },
      "4666e412-31ab-421b-b335-b30c7c322bdd.json": {
            "test_success": 1,
            "test_fail": 1,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 2.0
      },
      "780fc9bd-794c-4906-9f64-c04d19144e0f.json": {
            "test_success": 3,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 3.0
      },
      "ceb929b7-97d0-4d10-89f8-8206ce24e7a5.json": {
            "test_success": 2,
            "test_fail": 0,
            "submit_success": 0,
            "submit_fail": 0,
            "gameplay_duration": 2.0
      },
      "e95dfdda-ad84-47c2-8d04-105692208369.json": {
            "test_success": 2,
            "test_fail": 1,
            "submit_success": 0,
            "submit_fail": 0,
            "gameplay_duration": 5.0
      },
      "9553b141-533e-4cd7-bb59-5d8f8c56a507.json": {
            "test_success": 4,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 1,
            "gameplay_duration": 6.0
      },
      "c996d3cd-6f96-4b58-a4f4-60026db0edcc.json": {
            "test_success": 1,
            "test_fail": 0,
            "submit_success": 1,
            "submit_fail": 0,
            "gameplay_duration": 1.0
      },
      "5c2947cc-34b1-42ac-864c-3f69f9171c54.json": {
            "test_success": 2,
            "test_fail": 1,
            "submit_success": 1,
            "submit_fail": 1,
            "gameplay_duration": 3.0
      }
}
var minNodeSize = 5,
    maxNodeSize = 30,
    stateNodeTextSize = 20,
    padding = 1.5,
    svgX = 0,
    svgY = 200;

var displayingFreq = false;

let stateWidth = window.innerWidth / 2;
let stateHeight = window.innerHeight;
let sequenceWidth = (window.innerWidth / 2) - 1;
let sequenceHeight = window.innerHeight;
let groupHeight = 250;
let groupWidth = 250;
// window.onresize = function (e) {
//     stateWidth = window.innerWidth
// }
var div, svg;
var groupSvg;

var userIDLengthLimit = 10;
file_suffix = '';

var clicked_circle=''

// The below loads data from server
d3.json('data/visualization_ids.json', function (error, sessionList) {
    if (error) {
        alert("The file containing the list of match IDs does not exist.");
        return console.warn(error);
    }
    dd = sessionList;

    var selectUI = d3.select("#level-select")
    var options = selectUI.selectAll('option').data(dd); // Data join

    options.enter()
        .append("option")
        .text(function (d) {
            return d;
        });
    selectUI.property("value", dd[0]);

    // graph stores the loaded data
    sID = d3.select("#level-select").node().value;
    console.log(sID);
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);

});

var prevStroke, prevFill, prevFillOpa, prevStrokeOpa, prevTextFill;

/******************** State graph **********************************/

var stateforce = d3.layout.force()
    .charge(-1500)
    .linkDistance(1000)
    .size([stateWidth, stateHeight])
    .on("tick", statetick);

svg = d3.select("#state-graph-svg")
    .attr("width", stateWidth)
    .attr("height", stateHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", stateZoomPan))
    .on("dblclick.zoom", null)
    .append("svg:g")
    .attr("transform", "translate(200,200)scale(.5,.5)");


// the graph components (nodes and links)
var stateSvgContainer = svg.append("g").attr("id", "stategraph_container");
let statelink = stateSvgContainer.append("g").attr("id", "statelink_container").selectAll(".statelink");
let statenode = stateSvgContainer.append("g").attr("id", "statenode_container").selectAll(".statenode");

// Define markers
// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["start", "mid", "end"])
    .enter().append("marker")
    .attr("id", function (d) {
        return d;
    })
    // the region viewable in this marker
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 30) //1.5)
    .attr("markerHeight", 30) //1.5)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");

// for sticky drag
var statedrag = stateforce.drag().on("dragstart", dragstart);

/********************* Behavior graph ******************************/

const minDistance = 50;
const maxDistance = 500;

var behaviorforce = d3.layout.force()
    .charge(-100)
    .linkDistance(distanceMapping)
    .size([sequenceWidth, sequenceHeight])
    .on("tick", behaviortick);

svg = d3.select("#sequence-graph-svg")
    .attr("width", sequenceWidth)
    .attr("height", sequenceHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var behaviorSvgContainer = svg.append("g").attr("id", "graph_container");
var behaviorlink = behaviorSvgContainer.append("g").attr("id", "link_container").selectAll(".behaviorlink");
var behaviornode = behaviorSvgContainer.append("g").attr("id", "node_container").selectAll(".behaviornode");


// for sticky drag
var behaviordrag = behaviorforce.drag()
    .on("dragstart", behaviorDragstart);

//--------------- Functions ------------
var stateMap = {};
var actionMap = {};

function updateJSON(error, json) {

    if (error) {
        alert("Level does not exist!");
        return console.warn(error);
    }
    data = json;

    // update info on num statenodes and players
    d3.select("#level-id").text(data.level_info);
    // d3.select("#num-statenodes").text(data.nodes.length);

    // set statemap for fast access
    stateMap = {};
    data.nodes.forEach(function (aNode) {
        stateMap[aNode.id] = aNode;
    });

    actionMap = {};
    data.links.forEach(function (aLink) {
        actionMap[aLink.id] = aLink;
    });

    visualizeStateData();
    if (data.team_trajectories) {
        let group = document.getElementById('group-graph-container')
        group.classList.remove('none')
        d3.select("#group-trajectories").text(data.team_trajectories.length);
        visualizeGroupData();
    }

    // update info on num nodes and players
    d3.select("#num-sequences").text(data.trajectories.length);
    d3.select("#num-players").text(data.num_users);
    // d3.select("#num-teams").text(data.team_trajectories.length);

    visualizeBehaviorData();

    showLinks = true;
    toggleShowLinks();
}

function updateLevel() {
    clearHighlight();
    clearTextField();
    clearGroupNodesActive();
    sID = d3.select("#level-select").node().value;
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);
}

/******************** State graph **********************************/
var linearStateNodeScale, linearStateLinkScale;

var presetStateNodes = function (nodes) {

    margin = 100;
    maxX = 890;

    nodeSpacing = (maxX - 2 * margin) / 8;
    yNodeSpacing = 200;

    // Prefix positions of start and end nodes------
    nodes[0].fixed = true;
    nodes[0].x = margin;
    nodes[0].y = margin;

    nodes[1].fixed = true;
    nodes[1].x = stateWidth - margin;
    nodes[1].y = stateHeight - margin;
};

var state_node_label = function (d) {

    return extractDetails(d.details);

};

var state_link_label = function (d) {
    return d.details;
};


function visualizeStateData() {
    linearStateNodeScale = getStateNodeScale(data.nodes);
    linearStateLinkScale = getStateLinkScale(data.links);

    // Prefix positions of start and end nodes------
    presetStateNodes(data.nodes);
    //---------------------------------------------

    stateforce.nodes(data.nodes)
        .links(data.links);

    statelink = statelink.data(data.links);
    statenode = statenode.data(data.nodes);

    statelink.exit().remove();
    statenode.exit().remove();

    // UPDATE --------------------
    statelink.attr("id", function (d, i) {
        return 'statelink' + d.id;
    })
        .attr("class", updateLinkClass)
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";

        });
    statelink.select("title").text(function (d) {
        return state_link_label(d);
    });

    statenode.attr("id", function (d, i) {
        return 'statenode' + d.id;
    })
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .select("circle")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        });

    statenode.select("text")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    statenode.select("title").text(function (d) {
        return state_node_label(d);
    });

    // ENTER ----------------
    var statelinkGroup = statelink.enter().append("path") //.append("line")
        .attr("class", updateLinkClass)
        .attr("id", function (d, i) {
            return 'statelink' + d.id;
        })
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";
        })
        .on("click", function (d) {
        
            stateLinkClicked(d)
        })
        .on("dblclick", function (d) {
        
            setPlaytraceIndex(d)
            highlightNodeID()
        })
        .on("mouseover", function (d) {
            if (!d3.select("#playtrace-index").node().value) {
                highlightNodeStroke(d, true)
            }
        })
        .on("mouseout", function (d) {
            highlightNodeStroke(d, false)
        })

    statelinkGroup.append("title").text(function (d) {
        return state_link_label(d);
    });

    var statenodeGroup = statenode.enter().append("g")
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .attr("id", function (d, i) {
            return 'statenode' + d.id;
        })
        //andy
        //disabled
        // .on("dblclick", dblclick)
        .call(statedrag);

    statenodeGroup.append("title").text(function (d) {
        return state_node_label(d);
    });

    statenodeGroup.append("circle")
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .on('click',function(d){
            // edited
            // 't' variable is reponsible for checking if a particular player is clicked, called in behaviorDragStart() function, returned from displayStateImages() function
            // imagedisplay_id= list with a user_id, whose board_state images are being displayed
            // node_image_mapper is defined on top
            if(t)
            {
                // this means the images for a particular id are being displayed
                $('#player_state_image').empty()
                user_id=imagedisplay_id[0]
                console.log("user id")
                console.log(user_id.slice(0,-5))
                for(i=0;i<d.details.board_ids.length;i++)
                {
                    var file1="Screenshots/"+user_id.slice(0,-5)+"/"+d.details.board_ids[i]+".png"
                    for (j=0;j<node_image_mapper[user_id.slice(0,-5)].length;j++)
                    {
                        file_list=node_image_mapper[user_id.slice(0,-5)][j].split("/")
                        board_file_list=file_list[2].split("_")
                        board_file=board_file_list[1]
                        file2=file_list[0]+"/"+file_list[1]+"/"+board_file
                        console.log("file2")
                        console.log(file2)
                        if(file2==file1)
                        {
                            $('#player_state_image').append("<img class='image-style'" + "src= "+ node_image_mapper[user_id.slice(0,-5)][j] + ">")
    
                        }
                    }
                    // if(node_image_mapper[user_id.slice(0,-5)].includes(file1))
                    // {
                    //     console.log(file1)
                    //     $('#player_state_image').append("<img class='image-style'" + "src= "+ file1 + ">")
                    // }
                }

            }

        })
        .on("mouseover", stateDisplayInfo);

    statenodeGroup.append("text")
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("dy", ".35em")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("font-size", function (d) {
            return stateNodeTextSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    // EXIT --------------------------------------


    stateforce.start();

}


// Group Graph

var groupForce = d3.layout.force()
    .charge(-100)
    // .linkDistance(distanceMapping)
    .linkDistance(100)
    .size([groupWidth, groupHeight])
    .on("tick", groupTick);

groupSvg = d3.select("#group-graph-svg")
    .attr("width", groupWidth)
    .attr("height", groupHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var groupSvgContainer = groupSvg.append("g").attr("id", "group-graph-container");
var groupLink = groupSvgContainer.append("g").attr("id", "group-link-container").selectAll(".groupLink");
var groupNode = groupSvgContainer.append("g").attr("id", "group-node-container").selectAll(".groupNode");


// for sticky drag
var groupDrag = groupForce.drag()
    .on("dragstart", groupDragStart);

//--------------- Functions ------------


// flag: 1 - popularity, 2 - look significant
// can create function instead of copying codes
var changeStateNodeSizeType = function (flag) {
    switch (flag) {

        case 1:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                })
            break;

        case 2:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                })
            break;

    }
};

function statetick(e) {
    statelink.attr("d", function (d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy),

            // Defaults for normal edge.
            drx = dr,
            dry = dr,
            xRotation = 0,
            largeArc = 0,
            sweep = 1;

        // Self edge.
        if (x1 === x2 && y1 === y2) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop.
            //sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 30;
            dry = 20;

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
            x2 = x2 + 1;
            y2 = y2 + 1;
        }

        return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
    });

    statenode
        .each(collide(.5))
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
}


// Move nodes toward cluster focus.
function gravity(alpha) {
    return function (d) {
        if (d.type == 'mid') {
            d.y += (foci[gravityFocus[d.details.affect]].y - d.y) * alpha;
            d.x += (foci[gravityFocus[d.details.affect]].x - d.x) * alpha;
        }
    };
}

function getStrokeWidth(d) {
    return linearStateLinkScale(d.user_ids.length);
}

function updateLinkClass(d) {
    return 'statelink mid';
}

function getLinkTypeFromMeaning(meaning) {
    return "mid";
}

function getStateNodeScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

function getStateLinkScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

// collision detection
// Resolves collisions between d and all other circles.
function collide(alpha) {
    var quadtree = d3.geom.quadtree(data.nodes);
    return function (d) {
        // the radius of the current node
        var d_radius = linearStateNodeScale(d.user_ids.length);
        var r = d_radius + maxNodeSize + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;

        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d_radius + linearStateNodeScale(quad.point.user_ids.length) + padding;
                if (l < r) {
                    l = (l - r) / l * alpha; // padding
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}


function stateZoomPan() {
    stateSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function behaviorZoomPan() {
    behaviorSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// for sticky drag
// This callback can access this (the DOM object it is called upon)
function dblclick(d) {
    // somehow this works, but
    // d3.event.sourceEvent.stopPropagation(); does not

    d3.event.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = true);
    stateDisplayInfo(d);
}

// display info in textboxes
function stateDisplayInfo(d) {

    d3.select("#statenode-id").text(d.id);
    d3.select("#statenode-info").text(extractDetails(d.details));
    d3.select("#statenode-stats").text(extractStats(d.stats));
    d3.select("#num-players-state").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-state").text(d.user_ids);
    else d3.select("#players-state").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
}

// display link info in textboxes
function stateLinkClicked(d) {

    d3.select("#num-players-statelink").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-statelink").text(d.user_ids);
    else d3.select("#players-statelink").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
    d3.select("#statelink-info").text(state_link_label(d));


}

function getNumTrue(itemArray) {
    var result = 0;
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i][2]) result++;
    }
    return result;
}

// index 0: start, index 1: end
function setNodeForFreq(index) {
    var value = d3.select("#statenode-id").text();
    if (index == 0) {
        d3.select("#freq-start-node").node().value = value;
    } else d3.select("#freq-end-node").node().value = value;
}


/*************************** Behavior graph *******************/
function clearPlayerData()
{
    $('#state_images').empty()
    $('#player_state_image').empty()

}


var linearScaleBehaviorNode, distanceBehaviorScale;
function displayStateImages(id){
  
    clearPlayerData()
    var myImages=node_image_mapper
    id = id[0].substring(0, id[0].length - 5);
    for (var i = 0; i < myImages[id].length; i++) 
    {
        path =  myImages[id][i].replace(/\/$/, '');;
        $('#state_images').append("<img class='image-style' " + " src="+ path +'>')
         
    }
    return true;
}

function emptyPieDiv(){
    $('#overall_pie-pie').empty();
    $('#test_pie').empty();
    $('#submit_pie').empty();

}

function displayPieCharts(id){
    id = id[0]
    emptyPieDiv();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawOverallChart(id));
    google.charts.setOnLoadCallback(drawTestChart(id));
    google.charts.setOnLoadCallback(drawSubmitChart(id));
    


}
function drawOverallChart(id) {
    var overall_data = google.visualization.arrayToDataTable([
      ['Type', 'Percentage'],
      ['Test/Submit Pass',  playerStatisticsData[id]['test_success']+playerStatisticsData[id]['submit_success'] ],
      ['Test/Submit Fail', playerStatisticsData[id]['test_fail']+playerStatisticsData[id]['submit_fail']],
    ]);

    var options = {
      title: 'Overall'
    };

    var chart = new google.visualization.PieChart(document.getElementById('overall_pie'));

    chart.draw(overall_data, options);
  }
function drawTestChart(id) {
var test_data = google.visualization.arrayToDataTable([
    ['Type', 'Percentage'],
    ['Test/Submit Pass',  playerStatisticsData[id]['test_success']],
    ['Test/Submit Fail', playerStatisticsData[id]['test_fail']],
]);

var options = {
    title: 'Test Pass/Fail'
};

var chart = new google.visualization.PieChart(document.getElementById('test_pie'));

chart.draw(test_data, options);
}
function drawSubmitChart(id) {
var submit_data = google.visualization.arrayToDataTable([
    ['Type', 'Percentage'],
    ['Submit Pass',  playerStatisticsData[id]['submit_success'] ],
    ['Submit Fail', playerStatisticsData[id]['submit_fail']],
]);

var options = {
    title: 'Submit Pass/Fail'
};

var chart = new google.visualization.PieChart(document.getElementById('submit_pie'));

chart.draw(submit_data, options);
}


function highlightImage(id)
{

}

function returnHTML(d, i) {
    var nodeinfo = i + " (";
    if (d.completed) {
        nodeinfo = nodeinfo + "reach end state)";
    } else {
        nodeinfo = nodeinfo + "does not reach end state)"
    };

    return `<div class="tooltip-inner">
                <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
                <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
                <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
            </div>`
}

function visualizeBehaviorData() {
    let tooltip = d3.select('#tooltip')
    linearScaleBehaviorNode = getBehaviorNodeScale(data.trajectories);
    distanceBehaviorScale = getBehaviorDistanceScale(data.traj_similarity);

    behaviorforce.nodes(data.trajectories)
        .links(data.traj_similarity);

    behaviorlink = behaviorlink.data(data.traj_similarity);
    behaviornode = behaviornode.data(data.trajectories);

    behaviorlink.enter().append("line")
        .attr("class", "behaviorlink")
        .attr("id", function (d, i) {
            return 'behaviorlink' + d.id;
        });

    behaviornode.enter().append("g")
        .attr("id", function (d, i) {

            return 'behaviornode' + i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            // return 'behaviornode' + d.user_ids;
        })
        .attr("color", function (d) {
            if (d.id > 20) {
                let divisor = Math.floor(d.id / 20)
                let new_id = d.id - (20 * divisor)
                return fill(new_id)
            } else {
                return fill(d.id)
            }
        })

        //andy disabled
        // .on("dblclick", dblclick)
        // .on("mouseover", displayInfo)
        .call(behaviordrag);

    behaviornode.append("circle")
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        })
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')
        .on("mouseover", function (d, i) {
            activateCompleteSequence()
            displayInfo(d)
            
            shuffleNodeOrder(d.index)
            
            tooltip
                .style('opacity', 1)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .html(returnHTML(d, i))
        })
        .on("mouseout", function (d) {
            tooltip
                .style('opacity', 0)
        })

    behaviornode.append("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("dy", ".35em")
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    // UPDATE --------------------
    behaviorlink.attr("id", function (d, i) {
        return 'behaviorlink' + d.id;
    })
        .attr("class", "behaviorlink");

    behaviornode.attr("id", function (d, i) {
        return 'behaviornode' + i;
        // Jimmy changes i to d.user_ids to show the player id instead of default numbers
        // return 'behaviornode' + d.user_ids;
    })
        .attr("class", function (d) {
            if (d.completed)
                return `behaviornode complete ${d.user_ids[0]} ${d.id}`;
            return `behaviornode incomplete ${d.user_ids[0]} ${d.id}`;
        })
        .attr("node_index", function (d) {
            return d.id
        })
        .select("circle")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        });

    behaviornode.select("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    behaviorlink.exit().remove();
    behaviornode.exit().remove();
    behaviorforce.start();
}

// Group Graph

function returnGroupHTML(d, i) {
    // return `<div class="tooltip-inner">
    //             <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
    //             <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
    //             <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
    //         </div>`
}

function visualizeGroupData() {
    let tooltip = d3.select('#tooltip')
    groupForce.nodes(data.team_trajectories)
        .links(data.team_traj_similarity);

    groupLink = groupLink.data(data.team_traj_similarity);
    groupNode = groupNode.data(data.team_trajectories);

    groupLink.enter().append("line")
        .attr("class", "groupLink")
        .attr("id", function (d, i) {
            return 'groupLink' + d.id;
        });

    groupNode.enter().append("g")
        .attr("class", function(d) {
            return `groupNode groupNode${d.id}`
        })
        .call(groupDrag);

    groupNode.append("circle")
        .attr("id", function (d, i) {
            return 'groupNode' + i;
        })
        .attr('r', 15)
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')
        // .on("mouseover", function (d, i) {
        //     activateCompleteSequence()
        //     displayInfo(d)
        //     shuffleNodeOrder(d.index)
        //     tooltip
        //         .style('opacity', 1)
        //         .style("left", d3.event.pageX + "px")
        //         .style("top", d3.event.pageY + "px")
        //         .html(returnGroupHTML(d, i))
        // })
        // .on("mouseout", function (d) {
        //     tooltip
        //         .style('opacity', 0)
        // })
        .on("click", function(d) {
            clearGroupNodesActive()
            d3.select(this).classed('groupNode-active', true)
            highlightIndTrajectories(d)
            
        })

    groupNode.append("text")
        .attr("dx", ".9em")
        .attr("dy", ".4em")
        .text(function (d, i) {
            return i;
        });

    // UPDATE --------------------
    groupLink.attr("id", function (d, i) {
        return 'groupLink';
    })
        .attr("class", "groupLink");

    groupNode
        .select("circle")
        .attr('r', 15)


    groupNode.select("text")

        .attr("font-size", function (d) {
            return 20;
        })
        .text(function (d, i) {
            return i;
        });

    groupLink.exit().remove();
    groupNode.exit().remove();
    groupForce.start();
}

function clearGroupNodesActive() {
    d3.selectAll('.groupNode')
        .each(function(d) {
            let el = document.getElementById(`groupNode${d.index}`)
            if (el.classList.contains('groupNode-active')) {
                el.classList.remove('groupNode-active')
            }
        })
}

function toggleGroupNodeActive() {

}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

function highlightIndTrajectories(d) {
    let uniqueTraj = d.team_members_index.filter(unique)
    setPlaytraceIndex(uniqueTraj)
    highlightNodeID()

}



//Andy
function shuffleNodeOrder(node) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    let hoverNode = node.toString()
    if (nArray.includes(hoverNode)) {
        highlightNodeID(false, hoverNode)
    }
}

function distanceMapping(d) {
    return distanceBehaviorScale(d.similarity);
}


function behaviortick() {
    behaviorlink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    behaviornode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

function groupTick() {
    groupLink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    groupNode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

// set minValue and maxValue
function getBehaviorNodeScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });
    // if minValue and maxValue are the same,
    // we'll make it such that the node takes the big size.
    if (minValue == maxValue)
        minValue -= 1;
    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minNodeSize, maxNodeSize]);
}

function getBehaviorDistanceScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.similarity;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.similarity;
    });

    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minDistance, maxDistance]);
}

var showLinks = true;

function toggleShowLinks() {
    if (showLinks) {
        d3.selectAll(".behaviorlink").style("stroke", "transparent");
    } else {
        d3.selectAll(".behaviorlink").style("stroke", null);
    }

    showLinks = !showLinks;
}

// display info in textboxes
var displayInfo = function (d, i) {
    var nodeinfo = i + " (";
    if (d.completed) nodeinfo = nodeinfo + "reach end state)";
    else nodeinfo = nodeinfo + "does not reach end state)";

    // the start and end states are dummy
    d3.select("#num-states-in-trajectory").text(d.trajectory.length - 2);
    d3.select("#selected-node-index").text(nodeinfo);
    d3.select("#infobox").text(compressStates(d.trajectory));
    d3.select("#actionseq-info").text(compressArray(d.action_meaning));
    d3.select("#num-players-sequence").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-sequence").text(d.user_ids);
    else d3.select("#players-sequence").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
};

var extractDetails = function (detail_obj) {
    // movement events: show the region
    if (detail_obj.event_type.indexOf('movement') !== -1)
        return detail_obj.metadata.encounter;
    return detail_obj.event_type;
};


var extractStats = function (stats_obj) {
    return JSON.stringify(stats_obj);
};

var compressStates = function (pArray) {
    items = _.map(pArray, function (a) { return extractDetails(data.nodes[a].details); });
    return compressArray(items);
};

var compressArray = function (pArray) {
    var actions = "";
    var prevAction = "";
    var prevActionCount = 0;
    var currItem;
    for (var i = 1; i < pArray.length - 1; i++) {

        currItem = pArray[i];

        if (prevAction != currItem) {
            if (prevAction != "") {
                actions += prevAction + "(" + prevActionCount.toString() + ")";
                actions += ", ";
            }
            prevAction = currItem;
            prevActionCount = 1;
        } else prevActionCount += 1;
    }
    actions += prevAction + "(" + prevActionCount.toString() + ")";

    return actions;
};

var lowestOpacity = 0.1;

function behaviorDragstart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    clicked_circle = d.user_ids;
    // edited
    t=displayStateImages(d.user_ids)
    if(t)
    {
        imagedisplay_id=d.user_ids
    }
    
    displayPieCharts(d.user_ids)
    $('#time_spent_on_level').empty()
    $('#time_spent_on_level').append("Time Spent on Level " + playerStatisticsData[d.user_ids[0]]['gameplay_duration']+" minutes")

    applyOpacity(lowestOpacity);
    highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

function groupDragStart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    // applyOpacity(lowestOpacity);
    // highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

var archiveStyle = function (domNode) {
    prevStroke = d3.select(domNode).style("stroke");
    prevFill = d3.select(domNode).style("fill");
    prevStrokeOpa = d3.select(domNode).style("stroke-opacity");
    prevFillOpa = d3.select(domNode).style("fill-opacity");
    prevTextFill = d3.select(domNode).select("text").style("fill");
};

var restoreStyle = function (domNode) {
    d3.select(domNode).style("stroke-opacity", prevStrokeOpa)
        .style("stroke", prevStroke)
        .style("fill-opacity", prevFillOpa)
        .style("fill", prevFill);

    d3.select(domNode).select("text").style("fill", prevTextFill);
};

var highlightNodeID = function (reverse = false, hoverNode) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);

        if (reverse)
            nArray = nArray.reverse();

        if (hoverNode) {
            let index = nArray.indexOf(hoverNode)
            nArray.splice(index, 1)
            nArray.push(hoverNode)
        }
        _.each(nArray, function (item, ind) {
            let color = d3.select(`#behaviornode${item}`).node().getAttribute('color')
            highlightBehaviorNodeIndex(parseInt(item), color)
        })
        displayInfo(data.trajectories[nArray[0]], nArray[0]);

        // if reverse is set, set the text to the reverse
        if (reverse)
            d3.select("#playtrace-index").node().value = nArray.join();
    }
};

var setPlaytraceIndex = function (d) {
    let arr = []
    if (d.user_ids) {
        d.user_ids.forEach((u) => {
            let node_index = d3.select(`.${u}`).attr('node_index')
            arr.push(node_index)
        })
    } else {
        d.forEach((u) => {
            arr.push(u)
        })
    }
    document.getElementById("playtrace-index").value = arr;
}

var highlightNodeStroke = function (nodes, bool) {
    nodes.user_ids.forEach(d => {
        d3.select(`.${d}`).classed('selectednode', bool)
    })
};

var highlightNodeID_index = function (index = 0) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);
        if (index == -1)
            index = nArray.length - 1;
        highlightBehaviorNodeIndex(parseInt(nArray[index]), fill(index));
    }
};


function showInfoNodeID() {
    var index = parseInt(d3.select("#playtrace-show-info").node().value);
    displayInfo(data.trajectories[index], index);
}
/*************************** Highlighting ******************/


function clearHighlight() {

    // clear all styles for state graph
    d3.selectAll(".statelink,.statenode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".statenode circle").style("fill", null).style("stroke", null);

    d3.selectAll(".statenode").select("text")
        .style("fill", null)
        .style("fill-opacity", null);

    // clear behavior graph
    d3.selectAll(".behaviornode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".behaviornode circle").style("fill", null).style("stroke", null);

    applyOpacity(currentOpacity);

    displayingFreq = false;
}

function clearTextField() {
    document.getElementById('playtrace-index').value = '';
}


var highlightUserID = function () {
    clearHighlight();
    input = d3.select("#userID").node().value;
    // 1. find the user traj from the trajectories

    userIDs = input.split(",");
    first_one_highlighted = true;
    _.each(userIDs, function (userID, id) {
        var trajIndex = -1;
        for (var i = 0; i < data.trajectories.length; i++) {
            if (_.includes(data.trajectories[i].user_ids, userID)) {
                trajIndex = i;
                break;
            }
        }

        if (trajIndex >= 0) {
            if (first_one_highlighted) {
                applyOpacity(lowestOpacity);
                first_one_highlighted = false;
            }
            // 2 is red
            highlightBehaviorNodeIndex(trajIndex, fill(id));
            found_user = true;
        } else {
            alert('cant find');
        }
    });
};

var groupCache = {};
// This function construct the key to retrieve from groupCache
var constructGroupKey = function (feature, groupValue) {
    return feature + '_' + groupValue;
};

// flag: 1: team2, blue; 2: team3, red; 0: all
var highlightGroup = function (flag) {
    clearHighlight();
    applyOpacity(lowestOpacity);
    switch (flag) {
        case 1:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            break;
        case 2:
            highlightGroupWithName('red', 'red');  //<!team3>
            break;
        default:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            highlightGroupWithName('red', 'red');  //<!team3>
    }
};

//working
var highlightGroupWithName = function (grpName, color) {
    _.each(data.trajectories, function (traj, id) {
        //change this to high or low
        // if (traj.teams.indexOf(grpName) > -1)
        //     highlightBehaviorNodeIndex(id, color);
    });
};


function highlightBehaviorNodeIndex(index, color) {
    highlightTraj(data.trajectories[index], color);
    highlightBehaviorNode(index, color);
    displayInfo(data.trajectories[index], index);
    displayingFreq = true;
}

function highlightBehaviorNode(nodeToHighlight, color) {
    d3.select("#behaviornode" + nodeToHighlight).style("stroke-opacity", 1)
        .style("stroke", color)
        .style("fill", color)
        .style("fill-opacity", 1)
    // somehow have to set fill for cirle only.
    d3.select("#behaviornode" + nodeToHighlight).select("circle")
        .style("stroke", color)
        .style("fill", color);
}

function toggleKthTrajectories() {
    clearHighlight();
    applyOpacity(lowestOpacity);
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        numFrequent = (numHighlight - 1 + data.trajectories.length) % data.trajectories.length;
        highlightBehaviorNodeIndex(numFrequent, fill(numFrequent));
    }
}

function toggleHighlightFreqTrajectories() {
    clearHighlight();
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        applyOpacity(lowestOpacity);
        numFrequent = numHighlight;
        var bNodeArray = _.range(numFrequent);
        _.each(bNodeArray, function (d) {
            highlightBehaviorNodeIndex(d, fill(d));
        });
    }
}

function highlightTraj(trajString, color) {

    // 1. break the trajectory into nodes and statelinks ID
    ids = trajToIDs(trajString);

    // 2. assign the color to a corresponding list of colors.
    d3.selectAll(ids)
        .style("stroke", color)
        .style("stroke-opacity", 1);

    d3.selectAll(ids).select("circle")
        .style("fill-opacity", 1);

    d3.selectAll(ids).select("text")
        .style("fill", 'black')
        //            .style("fill", color)
        .style("fill-opacity", 1);
}


// return: "#statenode975, #statelink975_0, #statenode1015, #statelink1015_0, #statenode475 "
// for "975, 0, 1015, 1015_0, 475"
var trajToIDs = function (traj) {
    pArray = traj.trajectory;
    selectArray = "";
    for (var i = 0; i < pArray.length; i++) {
        selectArray += "#statenode" + pArray[i];
        if (i < pArray.length - 1) {
            selectArray += ", ";
            selectArray += "#statelink" + pArray[i] + "_" + pArray[i + 1] + ", ";
        }
    }
    return selectArray;
};

var currentOpacity = 0.7;
function incrementOpacity() {
    currentOpacity = currentOpacity + 0.1;
    if (currentOpacity > 1) currentOpacity = 1;
    applyOpacity(currentOpacity);
}

function decrementOpacity() {
    currentOpacity = currentOpacity - 0.1;
    if (currentOpacity < 0.2) currentOpacity = 0.2;
    applyOpacity(currentOpacity);
}

function applyOpacity(opacityValue) {
    d3.selectAll(".statelink,.statenode,.behaviorlink,.behaviornode")
        .style("stroke-opacity", opacityValue)
        .style("fill-opacity", opacityValue);
}

var freezeLayout = function () {
    // still moving
    if (behaviorforce.alpha() > 0) {
        stateforce.stop();
        behaviorforce.stop();
    } else {
        stateforce.resume();
        behaviorforce.resume();
    }
}

var allCurrentlyFixed = false;
var fixLayout = function () {
    allCurrentlyFixed = !allCurrentlyFixed;
    d3.selectAll(".statenode,.behaviornode")
        .classed("fixed", function (d) {
            d.fixed = allCurrentlyFixed;
        });
}

var incrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 1.5).start();
};

var decrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 0.7).start();
};

function toggleHighlightPanel() {
    let panel = document.getElementById('highlight-controls')
    let title = document.getElementById('highlight-title')
    let button = document.getElementById('highlight-button')
    let icon = document.getElementById('highlight-button-icon')
    if (panel.classList.contains('highlight-open')) {
        panel.classList.remove('highlight-open')
        panel.classList.add('highlight-closed')
        title.classList.remove('highlight-title-inactive')
        title.classList.add('highlight-title-active')
        button.classList.add('highlight-button-closed')
        icon.classList.remove('highlight-button-icon-closed')
    } else {
        panel.classList.remove('highlight-closed')
        panel.classList.add('highlight-open')
        title.classList.remove('highlight-title-active')
        title.classList.add('highlight-title-inactive')
        button.classList.remove('highlight-button-closed')
        icon.classList.add('highlight-button-icon-closed')
    }
}

function activateCompleteSequence() {
    let complete = document.getElementById('complete-sequence-container')
    if (!complete.classList.contains('complete-sequence-active')) {
        complete.classList.add('complete-sequence-active')
    }
}
