var fill = d3.scale.category20()
var data;
// edited for checking if the screenshots
// are displayed or not, initially false
var t=false;
var imagedisplay_id=0;
var upvote_value=""
var index1=0

//screenshot_dict.py in data
var node_image_mapper={'d0cd0662-ac0d-4d28-a799-3ed4a0495793': ['Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/1_597bc317-eb45-4090-b81a-b2f4150cfd4e.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/8_1944d25b-378a-4f97-adb3-38bc49858845.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/26_40823cc1-0d6f-440a-b091-0c582e9ef478.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/31_89ddbbcc-9698-4dfa-bd65-0370aa988d22.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/37_6e8c5c6d-7bdf-4388-a05c-d83517b91bf0.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/42_dd708036-369d-48b0-88ff-2599938135e0.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/47_1a7ef348-3d9f-47bb-85c2-dae165a4499c.png', 'Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/51_894898d0-6d71-4c9d-b970-3a2333bfd86a.png'], '787785b5-e800-45e2-82dd-9001eae092ef': ['Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/1_e48a9ee9-88d9-458a-90f6-310ac1648388.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/6_1bbe52c7-1cbb-4815-a466-de2653227b76.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/22_d922b07d-cf25-445f-93a7-f5d8fdf6a62d.png', 'Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/27_842b987f-f501-4733-b9eb-cb95bf531308.png'], '64ea8334-1539-4f9c-a5fd-9788528f5c3f': ['Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/1_b92622c7-8d33-4bdf-81f2-d9586f8372fc.png', 'Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/19_ea074978-808c-4154-b9ac-ba2dc7fa3f76.png', 'Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/24_4dd21595-6e47-4d16-a634-b8ef5d557dd9.png'], '0ba55f9b-be6f-4478-b31a-547ea6f64ef4': ['Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/1_0be69300-22b0-4188-8266-a6ddfe5549cb.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/18_2859e968-727c-436a-a5f4-48d238bded39.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/23_2e2e0548-7e61-4be1-85a0-3a0668f3367e.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/30_9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/35_aae671a0-04eb-4fb1-bcaa-74fc435bf802.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/42_d931ace6-beb4-4c79-be1d-1b5bb4fabbc3.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/47_1e01ec66-2765-4820-b808-ffc403bd71cf.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/82_6579a28f-bbf8-40e3-a7b9-7d6d67caec82.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/87_9be107b9-da31-4875-a587-6f2996961b02.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/120_7d37d945-eef1-419a-b3ce-dcc23c031602.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/125_8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/154_1f95841a-7c32-4b5f-a224-d31c8a93bc39.png', 'Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/159_f1a88354-b996-4e18-8e12-79d971d286ff.png'], '34939330-b4bf-42a6-88b1-294148819974': ['Screenshots/34939330-b4bf-42a6-88b1-294148819974/1_9d24ed0b-7765-4a84-8da6-35780361028c.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/13_5bc4afec-64ca-4ef8-ac03-e32439f346b4.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/18_25a8c409-dae1-4eb7-8a71-e09aa939bda8.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/28_fec18323-9bc0-4250-b27d-43948279ff0e.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/34_19151c6d-778e-451a-a90d-e06821f62cf5.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/44_53167228-d59a-4a84-a524-655f2f989be8.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/49_aa075a9b-6827-488f-b4ba-db492aba8261.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/54_46f77fec-cb8e-4867-b064-13dd4d32846b.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/60_e3811663-3ddd-4226-9ce5-0f09819a5ccc.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/66_834dbb25-5c09-484e-ba56-35b6e561ed26.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/71_0e636362-c9d5-4a93-b0af-40c14379c6dd.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/78_78104501-4d16-467a-8810-3849872c945b.png', 'Screenshots/34939330-b4bf-42a6-88b1-294148819974/83_2261d2f8-8469-43c1-9909-64aafa27e120.png'], '248d368d-232d-46c8-b137-8f81dc77f809': ['Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/1_67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/20_15ff1a2d-5115-4926-9dae-aa2bb176a3b4.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/25_a4d2da66-df19-4e79-8f8f-ca1db6b47d30.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/34_df0f9351-534e-46bf-b43f-ffb9bee275f7.png', 'Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/39_c92eab9e-1163-418a-9f33-7ced9804a7f0.png'], '5c2947cc-34b1-42ac-864c-3f69f9171c54': ['Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/1_9c5ba07a-af2e-4c6f-b143-b2015b9033ea.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/7_c5d349c1-0f51-4903-84f6-f70b4b018c89.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/16_8760bda7-4f39-4fa6-8d4c-c071eb8cd752.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/21_bdb99255-3195-427b-a479-1e35e51182f3.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/32_56c1b0fa-c47f-4f72-a4a3-3681fd7109d8.png', 'Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/37_5550e9b4-054a-4c45-9f14-1f9dd95cd1be.png'], '9553b141-533e-4cd7-bb59-5d8f8c56a507': ['Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/1_ffb6595a-86e8-456e-a102-cd20c586accc.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/7_8da1015b-212e-4f0b-a893-9ac91f7b10e7.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/23_6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/30_7583a156-7589-4c3b-bdad-0516cc26caea.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/35_48d32ffd-3087-4a96-9ec6-17ec49a16f1e.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/43_f240de04-55de-43ff-9d4d-23bc48b5eb94.png', 'Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/48_ae10d27d-25c3-42da-b455-82eca825cc4e.png'], '37023d9a-a8a3-4998-be0e-447962220be0': ['Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/1_fb96c809-f2a2-48d3-860f-f7e86e4d232f.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/16_24b016e4-a817-465d-b658-490a026e406e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/27_0ddcc244-042e-499e-9fe8-47834ed03d2e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/32_db5d8c95-6d1c-4174-8a80-129f2901b244.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/55_b64c9185-1352-4f2e-b7f2-cb59e46aad1e.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/61_8e32c003-90c7-4791-8b3a-f83ea484e278.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/63_9c5a2e37-0028-47db-8fa9-3152bbf27c48.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/78_b6210c61-ac25-48fd-94d0-6a570119cf2b.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/89_4f3e618f-88c2-44be-9b9e-bd236dbe11ba.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/117_b32b9a71-7e15-4597-ad73-3ecfdf6718ed.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/124_9e4b48b2-7530-47d6-a4aa-5d49e6a12039.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/132_6b44f318-9f01-4629-837a-546abb75ea30.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/146_114592a7-2914-43c4-860b-dad4523a6c1d.png', 'Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/151_f28a3846-107b-46f0-aef1-5b17f46ff485.png'], 'b4152ba7-4846-4ba2-93c4-eba434125dbe': ['Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/1_6f797556-6f82-4007-9fab-aca77b4a4da5.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/25_bc676979-9231-4ab6-ac0e-ac7d2232103c.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/30_b3d151d0-959e-47a4-877a-39f27aef64f3.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/36_10937638-c799-4142-9ffc-c701aac99828.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/41_f5ef9996-978a-46ba-ba02-298bd4118722.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/47_28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/52_c1c7e32f-350e-4fa2-9118-9a9b667857c4.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/61_c0801c25-049c-4536-ab8b-8f6a8aa3e87b.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/66_f4c89b24-8b5d-49e0-a2a6-2c0f68897990.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/73_4c67e78c-ec01-42b8-ab49-f074001537e4.png', 'Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/78_abc3d55c-ae25-47c8-9759-731e018fa416.png'], 'c996d3cd-6f96-4b58-a4f4-60026db0edcc': ['Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/1_b7eccd85-f6be-4f46-9090-58c6eb9e5e5c.png', 'Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/21_1653f60d-aaef-485a-bbff-fd161d5def4c.png', 'Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/26_3d7d46a1-cc46-4a25-a41e-ac323d8fd07f.png'], '4666e412-31ab-421b-b335-b30c7c322bdd': ['Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/1_00cedd67-4118-4bb2-948e-74bef8707793.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/7_ed903e9c-50b4-484d-9eb3-93968f8647a5.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/22_42daf75c-156d-4f40-bf19-54d56edebd2c.png', 'Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/27_fafd80b7-f84a-4818-bf50-f5c3762967dc.png'], '2e07ba3c-51be-498f-815a-768f3b7cb7e1': ['Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/1_ea5aa89f-e29d-47a8-ae21-abdd11a36442.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/19_8cce4560-586f-4239-a067-f0e2aabd3485.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/28_c987707b-a66b-4466-afde-2638747aa92b.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/33_dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/45_aaea46b2-0137-486b-9cc4-91afe0ccec45.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/52_075b44e9-ef68-4a30-84a1-6895955778a3.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/57_ae7e8247-aafc-486e-857a-f073f1753150.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/63_023a3dd8-f4d1-431d-bb75-58d257e2e39d.png', 'Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/68_86638d5a-050a-404b-82db-1db04836b4a2.png'], 'e95dfdda-ad84-47c2-8d04-105692208369': ['Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/1_c9b1b4b5-77b1-40be-b264-6a5b10aa1168.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/27_fb5b57f8-b45a-48dd-bcd2-6620081ff987.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/29_4507a496-caba-4ec2-ae8d-007dfe992908.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/48_114f550e-eaf3-4f21-95d3-2286aeafe74d.png', 'Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/55_313ad2d2-65ff-4484-b975-831adbdd2982.png'], 'ceb929b7-97d0-4d10-89f8-8206ce24e7a5': ['Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/1_6dcee51c-835c-4a34-90d6-92a142f2ab0c.png', 'Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/22_4c68015e-5197-4dc7-9d48-9174a4487703.png', 'Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/27_90db9630-4a01-44a6-80fb-6048768c7dfa.png'], '780fc9bd-794c-4906-9f64-c04d19144e0f': ['Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/1_2a0659af-d883-4d40-9aca-36f1c1eda6af.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/7_f64c6426-1f81-441a-9395-36e14d90c30c.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/25_c0df33f4-bb05-4de1-b648-e94c29292d50.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/31_7c1ab865-ea9c-493a-a28c-596eab63e0bc.png', 'Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/36_5cb88cc6-29f0-4a38-952d-335f6d84a14e.png']}

//gif_dict.py in data
var gif_mapper={'d0cd0662-ac0d-4d28-a799-3ed4a0495793': ['GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/0_1.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/1_8.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/8_26.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/26_31.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/31_37.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/37_42.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/42_47.gif', 'GIFs/d0cd0662-ac0d-4d28-a799-3ed4a0495793/47_51.gif'], '787785b5-e800-45e2-82dd-9001eae092ef': ['GIFs/787785b5-e800-45e2-82dd-9001eae092ef/0_1.gif', 'GIFs/787785b5-e800-45e2-82dd-9001eae092ef/1_6.gif', 'GIFs/787785b5-e800-45e2-82dd-9001eae092ef/6_22.gif', 'GIFs/787785b5-e800-45e2-82dd-9001eae092ef/22_27.gif'], '64ea8334-1539-4f9c-a5fd-9788528f5c3f': ['GIFs/64ea8334-1539-4f9c-a5fd-9788528f5c3f/0_1.gif', 'GIFs/64ea8334-1539-4f9c-a5fd-9788528f5c3f/1_19.gif', 'GIFs/64ea8334-1539-4f9c-a5fd-9788528f5c3f/19_24.gif'], '0ba55f9b-be6f-4478-b31a-547ea6f64ef4': ['GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0_1.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/1_18.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/18_23.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/23_30.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/30_35.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/35_42.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/42_47.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/47_82.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/82_87.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/87_120.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/120_125.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/125_154.gif', 'GIFs/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/154_159.gif'], '34939330-b4bf-42a6-88b1-294148819974': ['GIFs/34939330-b4bf-42a6-88b1-294148819974/0_1.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/1_13.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/13_18.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/18_28.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/28_34.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/34_44.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/44_49.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/49_54.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/54_60.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/60_66.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/66_71.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/71_78.gif', 'GIFs/34939330-b4bf-42a6-88b1-294148819974/78_83.gif'], '248d368d-232d-46c8-b137-8f81dc77f809': ['GIFs/248d368d-232d-46c8-b137-8f81dc77f809/0_1.gif', 'GIFs/248d368d-232d-46c8-b137-8f81dc77f809/1_20.gif', 'GIFs/248d368d-232d-46c8-b137-8f81dc77f809/20_25.gif', 'GIFs/248d368d-232d-46c8-b137-8f81dc77f809/25_34.gif', 'GIFs/248d368d-232d-46c8-b137-8f81dc77f809/34_39.gif'], '5c2947cc-34b1-42ac-864c-3f69f9171c54': ['GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/0_1.gif', 'GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/1_7.gif', 'GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/7_16.gif', 'GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/16_21.gif', 'GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/21_32.gif', 'GIFs/5c2947cc-34b1-42ac-864c-3f69f9171c54/32_37.gif'], '9553b141-533e-4cd7-bb59-5d8f8c56a507': ['GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/0_1.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/1_7.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/7_23.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/23_30.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/30_35.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/35_43.gif', 'GIFs/9553b141-533e-4cd7-bb59-5d8f8c56a507/43_48.gif'], '37023d9a-a8a3-4998-be0e-447962220be0': ['GIFs/37023d9a-a8a3-4998-be0e-447962220be0/0_1.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/1_16.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/16_27.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/27_32.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/32_55.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/55_61.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/61_63.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/63_78.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/78_89.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/89_117.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/117_124.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/124_132.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/132_146.gif', 'GIFs/37023d9a-a8a3-4998-be0e-447962220be0/146_151.gif'], 'b4152ba7-4846-4ba2-93c4-eba434125dbe': ['GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/0_1.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/1_25.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/25_30.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/30_36.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/36_41.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/41_47.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/47_52.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/52_61.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/61_66.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/66_73.gif', 'GIFs/b4152ba7-4846-4ba2-93c4-eba434125dbe/73_78.gif'], 'c996d3cd-6f96-4b58-a4f4-60026db0edcc': ['GIFs/c996d3cd-6f96-4b58-a4f4-60026db0edcc/0_1.gif', 'GIFs/c996d3cd-6f96-4b58-a4f4-60026db0edcc/1_21.gif', 'GIFs/c996d3cd-6f96-4b58-a4f4-60026db0edcc/21_26.gif'], '4666e412-31ab-421b-b335-b30c7c322bdd': ['GIFs/4666e412-31ab-421b-b335-b30c7c322bdd/0_1.gif', 'GIFs/4666e412-31ab-421b-b335-b30c7c322bdd/1_7.gif', 'GIFs/4666e412-31ab-421b-b335-b30c7c322bdd/7_22.gif', 'GIFs/4666e412-31ab-421b-b335-b30c7c322bdd/22_27.gif'], '2e07ba3c-51be-498f-815a-768f3b7cb7e1': ['GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/0_1.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/1_19.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/19_28.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/28_33.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/33_45.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/45_52.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/52_57.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/57_63.gif', 'GIFs/2e07ba3c-51be-498f-815a-768f3b7cb7e1/63_68.gif'], 'e95dfdda-ad84-47c2-8d04-105692208369': ['GIFs/e95dfdda-ad84-47c2-8d04-105692208369/0_1.gif', 'GIFs/e95dfdda-ad84-47c2-8d04-105692208369/1_27.gif', 'GIFs/e95dfdda-ad84-47c2-8d04-105692208369/27_29.gif', 'GIFs/e95dfdda-ad84-47c2-8d04-105692208369/29_48.gif', 'GIFs/e95dfdda-ad84-47c2-8d04-105692208369/48_55.gif'], 'ceb929b7-97d0-4d10-89f8-8206ce24e7a5': ['GIFs/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/0_1.gif', 'GIFs/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/1_22.gif', 'GIFs/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/22_27.gif'], '780fc9bd-794c-4906-9f64-c04d19144e0f': ['GIFs/780fc9bd-794c-4906-9f64-c04d19144e0f/0_1.gif', 'GIFs/780fc9bd-794c-4906-9f64-c04d19144e0f/1_7.gif', 'GIFs/780fc9bd-794c-4906-9f64-c04d19144e0f/7_25.gif', 'GIFs/780fc9bd-794c-4906-9f64-c04d19144e0f/25_31.gif', 'GIFs/780fc9bd-794c-4906-9f64-c04d19144e0f/31_36.gif']}

//stats.json
var playerStatisticsData = {
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
//stats_2.json
var playerEventStatisticsData={
      "b4152ba7-4846-4ba2-93c4-eba434125dbe.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 6,
            "MOVE_ELEMENT": 10,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 3
      },
      "248d368d-232d-46c8-b137-8f81dc77f809.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 6,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "34939330-b4bf-42a6-88b1-294148819974.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "BEGIN_LINK": 2,
            "MOVE_ELEMENT": 9,
            "TOGGLE_ELEMENT": 2
      },
      "37023d9a-a8a3-4998-be0e-447962220be0.json": {
            "BEGIN_LEVEL_LOAD": 2,
            "ADD_ELEMENT": 14,
            "BEGIN_LINK": 9,
            "MOVE_ELEMENT": 15,
            "TOGGLE_ELEMENT": 9,
            "REMOVE_ELEMENT": 4
      },
      "64ea8334-1539-4f9c-a5fd-9788528f5c3f.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "d0cd0662-ac0d-4d28-a799-3ed4a0495793.json": {
            "BEGIN_LEVEL_LOAD": 2,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 2,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "0ba55f9b-be6f-4478-b31a-547ea6f64ef4.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 16,
            "MOVE_ELEMENT": 14,
            "TOGGLE_ELEMENT": 5,
            "BEGIN_LINK": 8,
            "REMOVE_ELEMENT": 12
      },
      "2e07ba3c-51be-498f-815a-768f3b7cb7e1.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 8,
            "MOVE_ELEMENT": 4,
            "BEGIN_LINK": 4,
            "TOGGLE_ELEMENT": 2
      },
      "787785b5-e800-45e2-82dd-9001eae092ef.json": {
            "BEGIN_LEVEL_LOAD": 2,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "4666e412-31ab-421b-b335-b30c7c322bdd.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "780fc9bd-794c-4906-9f64-c04d19144e0f.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 2,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "ceb929b7-97d0-4d10-89f8-8206ce24e7a5.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 6,
            "MOVE_ELEMENT": 2,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 3
      },
      "e95dfdda-ad84-47c2-8d04-105692208369.json": {
            "BEGIN_LEVEL_LOAD": 2,
            "ADD_ELEMENT": 12,
            "BEGIN_LINK": 6,
            "MOVE_ELEMENT": 3,
            "TOGGLE_ELEMENT": 2
      },
      "9553b141-533e-4cd7-bb59-5d8f8c56a507.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 6,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "c996d3cd-6f96-4b58-a4f4-60026db0edcc.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1,
            "BEGIN_LINK": 2
      },
      "5c2947cc-34b1-42ac-864c-3f69f9171c54.json": {
            "BEGIN_LEVEL_LOAD": 1,
            "ADD_ELEMENT": 4,
            "BEGIN_LINK": 2,
            "MOVE_ELEMENT": 1,
            "TOGGLE_ELEMENT": 1
      }
}
//trace.json
var player_traces={
      "b4152ba7-4846-4ba2-93c4-eba434125dbe": {
            "6a5e7028-31fb-4c02-bffe-4023bd360118": {
                  "id": "6a5e7028-31fb-4c02-bffe-4023bd360118",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_6a5e7028-31fb-4c02-bffe-4023bd360118.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644085804
            },
            "6f797556-6f82-4007-9fab-aca77b4a4da5": {
                  "id": "6f797556-6f82-4007-9fab-aca77b4a4da5",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_6f797556-6f82-4007-9fab-aca77b4a4da5.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6f797556-6f82-4007-9fab-aca77b4a4da5"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644085836,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "19683a5d-24e5-4f8f-b746-70adde6f8174": {
                  "id": "19683a5d-24e5-4f8f-b746-70adde6f8174",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_19683a5d-24e5-4f8f-b746-70adde6f8174.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644147059
            },
            "e8506230-bbc3-40e3-ad87-0398e5b813fb": {
                  "id": "e8506230-bbc3-40e3-ad87-0398e5b813fb",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_e8506230-bbc3-40e3-ad87-0398e5b813fb.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644151289
            },
            "6f1f6970-aa3b-47ed-9019-8c8a6d5c51b4": {
                  "id": "6f1f6970-aa3b-47ed-9019-8c8a6d5c51b4",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_6f1f6970-aa3b-47ed-9019-8c8a6d5c51b4.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644153394
            },
            "e641aa66-8eb7-4dc4-8524-73666d2c3b39": {
                  "id": "e641aa66-8eb7-4dc4-8524-73666d2c3b39",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "7_e641aa66-8eb7-4dc4-8524-73666d2c3b39.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644158180
            },
            "da1891e6-e285-4f66-ba85-12c4d847c95e": {
                  "id": "da1891e6-e285-4f66-ba85-12c4d847c95e",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "8_da1891e6-e285-4f66-ba85-12c4d847c95e.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644159239
            },
            "79ac3e7e-b0ad-45cc-98e9-9117a42cb348": {
                  "id": "79ac3e7e-b0ad-45cc-98e9-9117a42cb348",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "9_79ac3e7e-b0ad-45cc-98e9-9117a42cb348.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644159243
            },
            "428f972a-f584-4538-bc81-fabd0bf1d2fb": {
                  "id": "428f972a-f584-4538-bc81-fabd0bf1d2fb",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_428f972a-f584-4538-bc81-fabd0bf1d2fb.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644164695
            },
            "79d75891-2bc1-4168-a8ec-c8e2521a1138": {
                  "id": "79d75891-2bc1-4168-a8ec-c8e2521a1138",
                  "type": "ADD_ELEMENT",
                  "screenshot": "13_79d75891-2bc1-4168-a8ec-c8e2521a1138.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644167176
            },
            "9de995a5-769f-44f4-9ece-25d7ad267f6b": {
                  "id": "9de995a5-769f-44f4-9ece-25d7ad267f6b",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_9de995a5-769f-44f4-9ece-25d7ad267f6b.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "HA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644171485
            },
            "832b22c4-8afb-4b3b-bfbd-ad27ac33d41f": {
                  "id": "832b22c4-8afb-4b3b-bfbd-ad27ac33d41f",
                  "type": "BEGIN_LINK",
                  "screenshot": "16_832b22c4-8afb-4b3b-bfbd-ad27ac33d41f.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "HA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644177732
            },
            "4a597338-3b0d-4fe7-be6c-67819d147427": {
                  "id": "4a597338-3b0d-4fe7-be6c-67819d147427",
                  "type": "ADD_ELEMENT",
                  "screenshot": "18_4a597338-3b0d-4fe7-be6c-67819d147427.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "HA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644184874
            },
            "e59b02f2-0e30-43aa-9f27-3551aea88f73": {
                  "id": "e59b02f2-0e30-43aa-9f27-3551aea88f73",
                  "type": "BEGIN_LINK",
                  "screenshot": "19_e59b02f2-0e30-43aa-9f27-3551aea88f73.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "HA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644185599
            },
            "bc676979-9231-4ab6-ac0e-ac7d2232103c": {
                  "id": "bc676979-9231-4ab6-ac0e-ac7d2232103c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "25_bc676979-9231-4ab6-ac0e-ac7d2232103c.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "HA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "bc676979-9231-4ab6-ac0e-ac7d2232103c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644196181,
                  "submission_result": "success/TEST",
                  "ticks": 84
            },
            "b3d151d0-959e-47a4-877a-39f27aef64f3": {
                  "id": "b3d151d0-959e-47a4-877a-39f27aef64f3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "30_b3d151d0-959e-47a4-877a-39f27aef64f3.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "H": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "HA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b3d151d0-959e-47a4-877a-39f27aef64f3"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644205963,
                  "submission_result": "success/SUBMIT",
                  "ticks": 84
            },
            "c15594ae-333b-4f13-ac95-daa7952f642c": {
                  "id": "c15594ae-333b-4f13-ac95-daa7952f642c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "31_c15594ae-333b-4f13-ac95-daa7952f642c.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 2,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "CA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644245940
            },
            "10937638-c799-4142-9ffc-c701aac99828": {
                  "id": "10937638-c799-4142-9ffc-c701aac99828",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "36_10937638-c799-4142-9ffc-c701aac99828.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 2,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "CA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "10937638-c799-4142-9ffc-c701aac99828"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644252284,
                  "submission_result": "success/TEST",
                  "ticks": 125
            },
            "f5ef9996-978a-46ba-ba02-298bd4118722": {
                  "id": "f5ef9996-978a-46ba-ba02-298bd4118722",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "41_f5ef9996-978a-46ba-ba02-298bd4118722.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 2,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "CA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "f5ef9996-978a-46ba-ba02-298bd4118722"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644256113,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 285
            },
            "5d2b182a-6dca-46f8-ba48-71c3653df1de": {
                  "id": "5d2b182a-6dca-46f8-ba48-71c3653df1de",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "42_5d2b182a-6dca-46f8-ba48-71c3653df1de.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644281379
            },
            "28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad": {
                  "id": "28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "47_28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "28c71ce7-12c5-47d0-9c53-d5fb4a2d10ad"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644284977,
                  "submission_result": "success/TEST",
                  "ticks": 84
            },
            "c1c7e32f-350e-4fa2-9118-9a9b667857c4": {
                  "id": "c1c7e32f-350e-4fa2-9118-9a9b667857c4",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "52_c1c7e32f-350e-4fa2-9118-9a9b667857c4.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c1c7e32f-350e-4fa2-9118-9a9b667857c4"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644297075,
                  "submission_result": "success/SUBMIT",
                  "ticks": 84
            },
            "22dfffec-ad10-4c7e-acbd-9aa27a614674": {
                  "id": "22dfffec-ad10-4c7e-acbd-9aa27a614674",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "53_22dfffec-ad10-4c7e-acbd-9aa27a614674.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644366795
            },
            "c4236881-5178-4f24-916e-f1dc9b53aa34": {
                  "id": "c4236881-5178-4f24-916e-f1dc9b53aa34",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "54_c4236881-5178-4f24-916e-f1dc9b53aa34.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644368974
            },
            "51588f55-fe37-43b0-9246-c3a6c76c8b59": {
                  "id": "51588f55-fe37-43b0-9246-c3a6c76c8b59",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "55_51588f55-fe37-43b0-9246-c3a6c76c8b59.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644373924
            },
            "425e2e62-50dd-435a-8cee-c9d5830fc6c2": {
                  "id": "425e2e62-50dd-435a-8cee-c9d5830fc6c2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "56_425e2e62-50dd-435a-8cee-c9d5830fc6c2.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644381653
            },
            "c0801c25-049c-4536-ab8b-8f6a8aa3e87b": {
                  "id": "c0801c25-049c-4536-ab8b-8f6a8aa3e87b",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "61_c0801c25-049c-4536-ab8b-8f6a8aa3e87b.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c0801c25-049c-4536-ab8b-8f6a8aa3e87b"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644388222,
                  "submission_result": "success/TEST",
                  "ticks": 84
            },
            "f4c89b24-8b5d-49e0-a2a6-2c0f68897990": {
                  "id": "f4c89b24-8b5d-49e0-a2a6-2c0f68897990",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "66_f4c89b24-8b5d-49e0-a2a6-2c0f68897990.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "f4c89b24-8b5d-49e0-a2a6-2c0f68897990"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644410826,
                  "submission_result": "success/SUBMIT",
                  "ticks": 84
            },
            "119652a5-2667-4ce3-aff6-5f0d9cf94897": {
                  "id": "119652a5-2667-4ce3-aff6-5f0d9cf94897",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "67_119652a5-2667-4ce3-aff6-5f0d9cf94897.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644435035
            },
            "1962b57d-dafa-44c6-907c-42778c24a3f2": {
                  "id": "1962b57d-dafa-44c6-907c-42778c24a3f2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "68_1962b57d-dafa-44c6-907c-42778c24a3f2.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644438950
            },
            "4c67e78c-ec01-42b8-ab49-f074001537e4": {
                  "id": "4c67e78c-ec01-42b8-ab49-f074001537e4",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "73_4c67e78c-ec01-42b8-ab49-f074001537e4.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "4c67e78c-ec01-42b8-ab49-f074001537e4"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644446748,
                  "submission_result": "success/TEST",
                  "ticks": 82
            },
            "abc3d55c-ae25-47c8-9759-731e018fa416": {
                  "id": "abc3d55c-ae25-47c8-9759-731e018fa416",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "78_abc3d55c-ae25-47c8-9759-731e018fa416.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaaaz": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaabc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaay"
                        },
                        "aaaabh": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 7,
                              "link": "aaaaaz"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "abc3d55c-ae25-47c8-9759-731e018fa416"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644456068,
                  "submission_result": "success/SUBMIT",
                  "ticks": 82
            }
      },
      "248d368d-232d-46c8-b137-8f81dc77f809": {
            "35282a9e-b9cf-41e6-ab70-1cb0703bbe98": {
                  "id": "35282a9e-b9cf-41e6-ab70-1cb0703bbe98",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_35282a9e-b9cf-41e6-ab70-1cb0703bbe98.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634119781
            },
            "67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52": {
                  "id": "67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "67d36eaa-bd8f-40cb-b9b9-2a3e26c4ae52"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634119827,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "cb221549-131d-43f1-af1a-7565f52b2181": {
                  "id": "cb221549-131d-43f1-af1a-7565f52b2181",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_cb221549-131d-43f1-af1a-7565f52b2181.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634123551
            },
            "dc88f5d4-83fc-4919-8411-053fed5d61cd": {
                  "id": "dc88f5d4-83fc-4919-8411-053fed5d61cd",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "4_dc88f5d4-83fc-4919-8411-053fed5d61cd.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634131628
            },
            "50e1e56d-0a45-44b6-b92c-570ad2fcc247": {
                  "id": "50e1e56d-0a45-44b6-b92c-570ad2fcc247",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_50e1e56d-0a45-44b6-b92c-570ad2fcc247.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634135815
            },
            "24f992b5-4fe6-4fba-9f20-bec054120b12": {
                  "id": "24f992b5-4fe6-4fba-9f20-bec054120b12",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "7_24f992b5-4fe6-4fba-9f20-bec054120b12.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634137394
            },
            "900828e5-5a7c-4580-8676-9df15bf08e9f": {
                  "id": "900828e5-5a7c-4580-8676-9df15bf08e9f",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "8_900828e5-5a7c-4580-8676-9df15bf08e9f.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634137397
            },
            "b0ba9155-c696-49d5-b273-4ee452c6f093": {
                  "id": "b0ba9155-c696-49d5-b273-4ee452c6f093",
                  "type": "ADD_ELEMENT",
                  "screenshot": "9_b0ba9155-c696-49d5-b273-4ee452c6f093.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634142455
            },
            "d741980d-d4d8-4536-8ef4-e892e98077dd": {
                  "id": "d741980d-d4d8-4536-8ef4-e892e98077dd",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_d741980d-d4d8-4536-8ef4-e892e98077dd.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634147370
            },
            "3e5a7d3f-7220-4daf-8910-3afaae496ccb": {
                  "id": "3e5a7d3f-7220-4daf-8910-3afaae496ccb",
                  "type": "BEGIN_LINK",
                  "screenshot": "12_3e5a7d3f-7220-4daf-8910-3afaae496ccb.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634153198
            },
            "e0057152-b002-40fc-a879-fc6a083c87f8": {
                  "id": "e0057152-b002-40fc-a879-fc6a083c87f8",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_e0057152-b002-40fc-a879-fc6a083c87f8.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634155311
            },
            "15ff1a2d-5115-4926-9dae-aa2bb176a3b4": {
                  "id": "15ff1a2d-5115-4926-9dae-aa2bb176a3b4",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "20_15ff1a2d-5115-4926-9dae-aa2bb176a3b4.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "15ff1a2d-5115-4926-9dae-aa2bb176a3b4"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634162775,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "a4d2da66-df19-4e79-8f8f-ca1db6b47d30": {
                  "id": "a4d2da66-df19-4e79-8f8f-ca1db6b47d30",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "25_a4d2da66-df19-4e79-8f8f-ca1db6b47d30.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "a4d2da66-df19-4e79-8f8f-ca1db6b47d30"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634210767,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 262
            },
            "d12c176f-733f-4afa-b115-472274883a27": {
                  "id": "d12c176f-733f-4afa-b115-472274883a27",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "26_d12c176f-733f-4afa-b115-472274883a27.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634235570
            },
            "ec5ccee8-b792-4627-9b54-09ab4c76ab61": {
                  "id": "ec5ccee8-b792-4627-9b54-09ab4c76ab61",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "27_ec5ccee8-b792-4627-9b54-09ab4c76ab61.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634238309
            },
            "fa4c6b14-e410-42c3-bba1-c06d7f189354": {
                  "id": "fa4c6b14-e410-42c3-bba1-c06d7f189354",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "28_fa4c6b14-e410-42c3-bba1-c06d7f189354.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634247178
            },
            "84708945-0862-4eb6-8ce1-7ed9c87d6ecf": {
                  "id": "84708945-0862-4eb6-8ce1-7ed9c87d6ecf",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "29_84708945-0862-4eb6-8ce1-7ed9c87d6ecf.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634250246
            },
            "df0f9351-534e-46bf-b43f-ffb9bee275f7": {
                  "id": "df0f9351-534e-46bf-b43f-ffb9bee275f7",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "34_df0f9351-534e-46bf-b43f-ffb9bee275f7.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "df0f9351-534e-46bf-b43f-ffb9bee275f7"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634298582,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "c92eab9e-1163-418a-9f33-7ced9804a7f0": {
                  "id": "c92eab9e-1163-418a-9f33-7ced9804a7f0",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "39_c92eab9e-1163-418a-9f33-7ced9804a7f0.png",
                  "absolute_board_state": {
                        "aaaabg": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabh": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabi": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabg"
                        },
                        "aaaabj": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabh"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "board_ids": [
                              "c92eab9e-1163-418a-9f33-7ced9804a7f0"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624634308583,
                  "submission_result": "success/SUBMIT",
                  "ticks": 77
            }
      },
      "34939330-b4bf-42a6-88b1-294148819974": {
            "0ea4cbda-1722-4b95-9933-ea9160712410": {
                  "id": "0ea4cbda-1722-4b95-9933-ea9160712410",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_0ea4cbda-1722-4b95-9933-ea9160712410.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642217226
            },
            "9d24ed0b-7765-4a84-8da6-35780361028c": {
                  "id": "9d24ed0b-7765-4a84-8da6-35780361028c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_9d24ed0b-7765-4a84-8da6-35780361028c.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9d24ed0b-7765-4a84-8da6-35780361028c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642217257,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "b785a84b-77d0-47a3-850a-6966bc563b1c": {
                  "id": "b785a84b-77d0-47a3-850a-6966bc563b1c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_b785a84b-77d0-47a3-850a-6966bc563b1c.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642257474
            },
            "0a156bbc-5546-4ab2-8e2b-571f2b6a18ed": {
                  "id": "0a156bbc-5546-4ab2-8e2b-571f2b6a18ed",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_0a156bbc-5546-4ab2-8e2b-571f2b6a18ed.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642259746
            },
            "6861b302-ee14-4592-9958-10ba412154ee": {
                  "id": "6861b302-ee14-4592-9958-10ba412154ee",
                  "type": "BEGIN_LINK",
                  "screenshot": "7_6861b302-ee14-4592-9958-10ba412154ee.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642261091
            },
            "5bc4afec-64ca-4ef8-ac03-e32439f346b4": {
                  "id": "5bc4afec-64ca-4ef8-ac03-e32439f346b4",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "13_5bc4afec-64ca-4ef8-ac03-e32439f346b4.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "5bc4afec-64ca-4ef8-ac03-e32439f346b4"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642267722,
                  "submission_result": "success/TEST",
                  "ticks": 126
            },
            "25a8c409-dae1-4eb7-8a71-e09aa939bda8": {
                  "id": "25a8c409-dae1-4eb7-8a71-e09aa939bda8",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "18_25a8c409-dae1-4eb7-8a71-e09aa939bda8.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "25a8c409-dae1-4eb7-8a71-e09aa939bda8"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642295182,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 210
            },
            "5990fc9b-35b0-41f3-94c0-d0eac7d3ffa4": {
                  "id": "5990fc9b-35b0-41f3-94c0-d0eac7d3ffa4",
                  "type": "ADD_ELEMENT",
                  "screenshot": "19_5990fc9b-35b0-41f3-94c0-d0eac7d3ffa4.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642349851
            },
            "9998c88a-1be7-47c8-8111-d57bcc79ee1c": {
                  "id": "9998c88a-1be7-47c8-8111-d57bcc79ee1c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "20_9998c88a-1be7-47c8-8111-d57bcc79ee1c.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642353643
            },
            "851e309b-49a9-466e-bb83-e777e66f544b": {
                  "id": "851e309b-49a9-466e-bb83-e777e66f544b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "21_851e309b-49a9-466e-bb83-e777e66f544b.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642356089
            },
            "cb234da6-f3b6-4566-890c-32b188d956ff": {
                  "id": "cb234da6-f3b6-4566-890c-32b188d956ff",
                  "type": "BEGIN_LINK",
                  "screenshot": "22_cb234da6-f3b6-4566-890c-32b188d956ff.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DF": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642360784
            },
            "fec18323-9bc0-4250-b27d-43948279ff0e": {
                  "id": "fec18323-9bc0-4250-b27d-43948279ff0e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "28_fec18323-9bc0-4250-b27d-43948279ff0e.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DF": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "fec18323-9bc0-4250-b27d-43948279ff0e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642373845,
                  "submission_result": "failure/TEST",
                  "ticks": 267
            },
            "71c52549-1df3-4745-b81a-eb667e0e412b": {
                  "id": "71c52549-1df3-4745-b81a-eb667e0e412b",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "29_71c52549-1df3-4745-b81a-eb667e0e412b.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DF": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642402885
            },
            "19151c6d-778e-451a-a90d-e06821f62cf5": {
                  "id": "19151c6d-778e-451a-a90d-e06821f62cf5",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "34_19151c6d-778e-451a-a90d-e06821f62cf5.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DF": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "19151c6d-778e-451a-a90d-e06821f62cf5"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642405911,
                  "submission_result": "failure/TEST",
                  "ticks": 268
            },
            "6cc81c30-c668-4b24-b0f6-7907384edf14": {
                  "id": "6cc81c30-c668-4b24-b0f6-7907384edf14",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "35_6cc81c30-c668-4b24-b0f6-7907384edf14.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DF": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642454619
            },
            "ade9af48-5ca4-4093-9dac-e9abd8282689": {
                  "id": "ade9af48-5ca4-4093-9dac-e9abd8282689",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "36_ade9af48-5ca4-4093-9dac-e9abd8282689.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642466603
            },
            "b5ae1fca-aee9-4550-ae59-ba8e427eddd0": {
                  "id": "b5ae1fca-aee9-4550-ae59-ba8e427eddd0",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "37_b5ae1fca-aee9-4550-ae59-ba8e427eddd0.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642467359
            },
            "84131dde-5711-482e-8212-68382441f1ca": {
                  "id": "84131dde-5711-482e-8212-68382441f1ca",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "38_84131dde-5711-482e-8212-68382441f1ca.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642468452
            },
            "3ee52edb-b8a4-4281-894f-98cec11a4b0f": {
                  "id": "3ee52edb-b8a4-4281-894f-98cec11a4b0f",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "39_3ee52edb-b8a4-4281-894f-98cec11a4b0f.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642468459
            },
            "53167228-d59a-4a84-a524-655f2f989be8": {
                  "id": "53167228-d59a-4a84-a524-655f2f989be8",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "44_53167228-d59a-4a84-a524-655f2f989be8.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "53167228-d59a-4a84-a524-655f2f989be8"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642525220,
                  "submission_result": "success/TEST",
                  "ticks": 112
            },
            "aa075a9b-6827-488f-b4ba-db492aba8261": {
                  "id": "aa075a9b-6827-488f-b4ba-db492aba8261",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "49_aa075a9b-6827-488f-b4ba-db492aba8261.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "aa075a9b-6827-488f-b4ba-db492aba8261"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642535552,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 214
            },
            "46f77fec-cb8e-4867-b064-13dd4d32846b": {
                  "id": "46f77fec-cb8e-4867-b064-13dd4d32846b",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "54_46f77fec-cb8e-4867-b064-13dd4d32846b.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "DB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "46f77fec-cb8e-4867-b064-13dd4d32846b"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642542338,
                  "submission_result": "success/TEST",
                  "ticks": 112
            },
            "f726942c-f607-40ba-80b9-adb7709a26de": {
                  "id": "f726942c-f607-40ba-80b9-adb7709a26de",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "55_f726942c-f607-40ba-80b9-adb7709a26de.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "DB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642563045
            },
            "e3811663-3ddd-4226-9ce5-0f09819a5ccc": {
                  "id": "e3811663-3ddd-4226-9ce5-0f09819a5ccc",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "60_e3811663-3ddd-4226-9ce5-0f09819a5ccc.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "DB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "e3811663-3ddd-4226-9ce5-0f09819a5ccc"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642571569,
                  "submission_result": "success/TEST",
                  "ticks": 112
            },
            "f6969c0d-213e-4348-af6b-1f9795c53353": {
                  "id": "f6969c0d-213e-4348-af6b-1f9795c53353",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "61_f6969c0d-213e-4348-af6b-1f9795c53353.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642602745
            },
            "834dbb25-5c09-484e-ba56-35b6e561ed26": {
                  "id": "834dbb25-5c09-484e-ba56-35b6e561ed26",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "66_834dbb25-5c09-484e-ba56-35b6e561ed26.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "834dbb25-5c09-484e-ba56-35b6e561ed26"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642623122,
                  "submission_result": "success/TEST",
                  "ticks": 110
            },
            "0e636362-c9d5-4a93-b0af-40c14379c6dd": {
                  "id": "0e636362-c9d5-4a93-b0af-40c14379c6dd",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "71_0e636362-c9d5-4a93-b0af-40c14379c6dd.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "0e636362-c9d5-4a93-b0af-40c14379c6dd"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642627663,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 214
            },
            "846a4c51-c3c9-46aa-8418-7dcd26f19b53": {
                  "id": "846a4c51-c3c9-46aa-8418-7dcd26f19b53",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "72_846a4c51-c3c9-46aa-8418-7dcd26f19b53.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642662844
            },
            "5af9e7f4-6bf2-4cf4-b1d4-59e70ffd6ea0": {
                  "id": "5af9e7f4-6bf2-4cf4-b1d4-59e70ffd6ea0",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "73_5af9e7f4-6bf2-4cf4-b1d4-59e70ffd6ea0.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642662854
            },
            "78104501-4d16-467a-8810-3849872c945b": {
                  "id": "78104501-4d16-467a-8810-3849872c945b",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "78_78104501-4d16-467a-8810-3849872c945b.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "78104501-4d16-467a-8810-3849872c945b"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642665942,
                  "submission_result": "success/TEST",
                  "ticks": 70
            },
            "2261d2f8-8469-43c1-9909-64aafa27e120": {
                  "id": "2261d2f8-8469-43c1-9909-64aafa27e120",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "83_2261d2f8-8469-43c1-9909-64aafa27e120.png",
                  "absolute_board_state": {
                        "aaaadk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaadl": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaadk"
                        },
                        "aaaado": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaadp"
                        },
                        "aaaadp": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 7,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GB": 1
                        },
                        "board_ids": [
                              "2261d2f8-8469-43c1-9909-64aafa27e120"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642674911,
                  "submission_result": "success/SUBMIT",
                  "ticks": 70
            }
      },
      "37023d9a-a8a3-4998-be0e-447962220be0": {
            "0e838952-fbf7-4211-8979-fc235c7367ad": {
                  "id": "0e838952-fbf7-4211-8979-fc235c7367ad",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_0e838952-fbf7-4211-8979-fc235c7367ad.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642872976
            },
            "fb96c809-f2a2-48d3-860f-f7e86e4d232f": {
                  "id": "fb96c809-f2a2-48d3-860f-f7e86e4d232f",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_fb96c809-f2a2-48d3-860f-f7e86e4d232f.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "fb96c809-f2a2-48d3-860f-f7e86e4d232f"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642873008,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "edf2da3d-d5e6-44e5-827b-bb70e1ef05ce": {
                  "id": "edf2da3d-d5e6-44e5-827b-bb70e1ef05ce",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_edf2da3d-d5e6-44e5-827b-bb70e1ef05ce.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642886774
            },
            "abd41ec3-3422-40e9-a1a5-86d27892a94c": {
                  "id": "abd41ec3-3422-40e9-a1a5-86d27892a94c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_abd41ec3-3422-40e9-a1a5-86d27892a94c.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642888824
            },
            "08f7bf3e-a431-462e-812c-760dbfa222e0": {
                  "id": "08f7bf3e-a431-462e-812c-760dbfa222e0",
                  "type": "ADD_ELEMENT",
                  "screenshot": "7_08f7bf3e-a431-462e-812c-760dbfa222e0.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642894877
            },
            "58e930f5-cd66-421a-becd-f52f8fe87fd4": {
                  "id": "58e930f5-cd66-421a-becd-f52f8fe87fd4",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_58e930f5-cd66-421a-becd-f52f8fe87fd4.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642897105
            },
            "e74a2796-34aa-473e-a3b3-823daf0a04e5": {
                  "id": "e74a2796-34aa-473e-a3b3-823daf0a04e5",
                  "type": "BEGIN_LINK",
                  "screenshot": "9_e74a2796-34aa-473e-a3b3-823daf0a04e5.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642898419
            },
            "78784a23-d0e7-4ca1-b676-a072e60340a5": {
                  "id": "78784a23-d0e7-4ca1-b676-a072e60340a5",
                  "type": "BEGIN_LINK",
                  "screenshot": "11_78784a23-d0e7-4ca1-b676-a072e60340a5.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642900426
            },
            "24b016e4-a817-465d-b658-490a026e406e": {
                  "id": "24b016e4-a817-465d-b658-490a026e406e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "16_24b016e4-a817-465d-b658-490a026e406e.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "24b016e4-a817-465d-b658-490a026e406e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642908577,
                  "submission_result": "failure/TEST",
                  "ticks": 5
            },
            "022b5d2a-151f-4aa5-acb0-527336d755c4": {
                  "id": "022b5d2a-151f-4aa5-acb0-527336d755c4",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "17_022b5d2a-151f-4aa5-acb0-527336d755c4.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642926630
            },
            "98a0bff2-3998-4cd8-a1b5-40be6fad8405": {
                  "id": "98a0bff2-3998-4cd8-a1b5-40be6fad8405",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "18_98a0bff2-3998-4cd8-a1b5-40be6fad8405.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642926636
            },
            "fffeeb56-4cc3-4af6-8d4d-2208ef40dc32": {
                  "id": "fffeeb56-4cc3-4af6-8d4d-2208ef40dc32",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "19_fffeeb56-4cc3-4af6-8d4d-2208ef40dc32.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642928258
            },
            "2ca854cd-f24a-4bbb-8dcd-5e9bba92f5c3": {
                  "id": "2ca854cd-f24a-4bbb-8dcd-5e9bba92f5c3",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "20_2ca854cd-f24a-4bbb-8dcd-5e9bba92f5c3.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642928261
            },
            "7d373245-e96e-4dc1-af1a-2893a32ae85a": {
                  "id": "7d373245-e96e-4dc1-af1a-2893a32ae85a",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "21_7d373245-e96e-4dc1-af1a-2893a32ae85a.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642929129
            },
            "326c8f9b-06e7-4822-be41-45a36929eb09": {
                  "id": "326c8f9b-06e7-4822-be41-45a36929eb09",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "22_326c8f9b-06e7-4822-be41-45a36929eb09.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642929134
            },
            "0ddcc244-042e-499e-9fe8-47834ed03d2e": {
                  "id": "0ddcc244-042e-499e-9fe8-47834ed03d2e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "27_0ddcc244-042e-499e-9fe8-47834ed03d2e.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "0ddcc244-042e-499e-9fe8-47834ed03d2e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642932902,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "db5d8c95-6d1c-4174-8a80-129f2901b244": {
                  "id": "db5d8c95-6d1c-4174-8a80-129f2901b244",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "32_db5d8c95-6d1c-4174-8a80-129f2901b244.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "db5d8c95-6d1c-4174-8a80-129f2901b244"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642962784,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 239
            },
            "4593c3ab-24f8-415a-bdde-9295b144165d": {
                  "id": "4593c3ab-24f8-415a-bdde-9295b144165d",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "34_4593c3ab-24f8-415a-bdde-9295b144165d.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaadv": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642984075
            },
            "852e3d8d-7790-4034-a5a5-a948ea2d67f1": {
                  "id": "852e3d8d-7790-4034-a5a5-a948ea2d67f1",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "40_852e3d8d-7790-4034-a5a5-a948ea2d67f1.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642994126
            },
            "f728d4ed-f3be-4d9b-8444-f0c817bb6172": {
                  "id": "f728d4ed-f3be-4d9b-8444-f0c817bb6172",
                  "type": "ADD_ELEMENT",
                  "screenshot": "42_f728d4ed-f3be-4d9b-8444-f0c817bb6172.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaadu": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaadt"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642996736
            },
            "af249368-f16a-45db-8e3d-961964caa243": {
                  "id": "af249368-f16a-45db-8e3d-961964caa243",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "44_af249368-f16a-45db-8e3d-961964caa243.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624642999282
            },
            "be4b13f6-9e7a-44bb-8eec-321feaf4eea7": {
                  "id": "be4b13f6-9e7a-44bb-8eec-321feaf4eea7",
                  "type": "ADD_ELEMENT",
                  "screenshot": "46_be4b13f6-9e7a-44bb-8eec-321feaf4eea7.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643000881
            },
            "1edaa6b0-973b-412c-af09-02cc7cc3faf7": {
                  "id": "1edaa6b0-973b-412c-af09-02cc7cc3faf7",
                  "type": "BEGIN_LINK",
                  "screenshot": "47_1edaa6b0-973b-412c-af09-02cc7cc3faf7.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643003581
            },
            "12df2eb7-d2fe-4043-b84d-a00c03df7d28": {
                  "id": "12df2eb7-d2fe-4043-b84d-a00c03df7d28",
                  "type": "BEGIN_LINK",
                  "screenshot": "49_12df2eb7-d2fe-4043-b84d-a00c03df7d28.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643005761
            },
            "b64c9185-1352-4f2e-b7f2-cb59e46aad1e": {
                  "id": "b64c9185-1352-4f2e-b7f2-cb59e46aad1e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "55_b64c9185-1352-4f2e-b7f2-cb59e46aad1e.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b64c9185-1352-4f2e-b7f2-cb59e46aad1e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643032540,
                  "submission_result": "failure/TEST",
                  "ticks": 172
            },
            "618957f5-ee85-41da-b9c2-7a2dcdcb1ec2": {
                  "id": "618957f5-ee85-41da-b9c2-7a2dcdcb1ec2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "56_618957f5-ee85-41da-b9c2-7a2dcdcb1ec2.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643058119
            },
            "30f0ba22-bc28-4389-8b5f-d97b8553a32e": {
                  "id": "30f0ba22-bc28-4389-8b5f-d97b8553a32e",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "57_30f0ba22-bc28-4389-8b5f-d97b8553a32e.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643058129
            },
            "8e32c003-90c7-4791-8b3a-f83ea484e278": {
                  "id": "8e32c003-90c7-4791-8b3a-f83ea484e278",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "61_8e32c003-90c7-4791-8b3a-f83ea484e278.png",
                  "absolute_board_state": {
                        "aaaads": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaadt": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaea": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaadt"
                        },
                        "aaaaeb": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaads"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "8e32c003-90c7-4791-8b3a-f83ea484e278"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643060243,
                  "submission_result": "failure/TEST",
                  "ticks": 5
            },
            "72ab73eb-8e8e-4e68-92c2-73e2b9201627": {
                  "id": "72ab73eb-8e8e-4e68-92c2-73e2b9201627",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "62_72ab73eb-8e8e-4e68-92c2-73e2b9201627.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643097092
            },
            "9c5a2e37-0028-47db-8fa9-3152bbf27c48": {
                  "id": "9c5a2e37-0028-47db-8fa9-3152bbf27c48",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "63_9c5a2e37-0028-47db-8fa9-3152bbf27c48.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9c5a2e37-0028-47db-8fa9-3152bbf27c48"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643097270,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "cbd30585-4a19-4dbe-bb9f-7c531c480d07": {
                  "id": "cbd30585-4a19-4dbe-bb9f-7c531c480d07",
                  "type": "ADD_ELEMENT",
                  "screenshot": "67_cbd30585-4a19-4dbe-bb9f-7c531c480d07.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643130575
            },
            "5c4aef4b-63e9-48bb-bc08-f9c64c04f0c1": {
                  "id": "5c4aef4b-63e9-48bb-bc08-f9c64c04f0c1",
                  "type": "ADD_ELEMENT",
                  "screenshot": "68_5c4aef4b-63e9-48bb-bc08-f9c64c04f0c1.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643132420
            },
            "12c93f96-12b0-479a-8437-dca193561e7f": {
                  "id": "12c93f96-12b0-479a-8437-dca193561e7f",
                  "type": "ADD_ELEMENT",
                  "screenshot": "69_12c93f96-12b0-479a-8437-dca193561e7f.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643136046
            },
            "3ae1ceaf-250f-4a0b-9b61-74be740bebd9": {
                  "id": "3ae1ceaf-250f-4a0b-9b61-74be740bebd9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "70_3ae1ceaf-250f-4a0b-9b61-74be740bebd9.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643137940
            },
            "6e3ca6ff-1aaf-49e6-b9b2-acc12d7ce028": {
                  "id": "6e3ca6ff-1aaf-49e6-b9b2-acc12d7ce028",
                  "type": "BEGIN_LINK",
                  "screenshot": "71_6e3ca6ff-1aaf-49e6-b9b2-acc12d7ce028.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643139696
            },
            "2f038514-bf01-405b-add2-b2805973e0f1": {
                  "id": "2f038514-bf01-405b-add2-b2805973e0f1",
                  "type": "BEGIN_LINK",
                  "screenshot": "73_2f038514-bf01-405b-add2-b2805973e0f1.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643141882
            },
            "b6210c61-ac25-48fd-94d0-6a570119cf2b": {
                  "id": "b6210c61-ac25-48fd-94d0-6a570119cf2b",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "78_b6210c61-ac25-48fd-94d0-6a570119cf2b.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b6210c61-ac25-48fd-94d0-6a570119cf2b"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643147717,
                  "submission_result": "failure/TEST",
                  "ticks": 5
            },
            "b3247bd1-4f26-4a22-b1e5-051ef43068b2": {
                  "id": "b3247bd1-4f26-4a22-b1e5-051ef43068b2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "79_b3247bd1-4f26-4a22-b1e5-051ef43068b2.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643160146
            },
            "720fc987-7cf3-47cf-ad0b-6a782c1d4f83": {
                  "id": "720fc987-7cf3-47cf-ad0b-6a782c1d4f83",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "80_720fc987-7cf3-47cf-ad0b-6a782c1d4f83.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643160154
            },
            "d4c4f92b-e41c-4399-b932-3a284a6d375e": {
                  "id": "d4c4f92b-e41c-4399-b932-3a284a6d375e",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "81_d4c4f92b-e41c-4399-b932-3a284a6d375e.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643161552
            },
            "5152097a-6ccd-4115-9c67-31f3bd9cd4dc": {
                  "id": "5152097a-6ccd-4115-9c67-31f3bd9cd4dc",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "82_5152097a-6ccd-4115-9c67-31f3bd9cd4dc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643161564
            },
            "d4df55c4-d8f9-483c-b0f0-5ab288951ed5": {
                  "id": "d4df55c4-d8f9-483c-b0f0-5ab288951ed5",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "83_d4df55c4-d8f9-483c-b0f0-5ab288951ed5.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643162149
            },
            "fbb498a2-b393-4e00-84a6-b53e21e60fff": {
                  "id": "fbb498a2-b393-4e00-84a6-b53e21e60fff",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "84_fbb498a2-b393-4e00-84a6-b53e21e60fff.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643162170
            },
            "4f3e618f-88c2-44be-9b9e-bd236dbe11ba": {
                  "id": "4f3e618f-88c2-44be-9b9e-bd236dbe11ba",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "89_4f3e618f-88c2-44be-9b9e-bd236dbe11ba.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "4f3e618f-88c2-44be-9b9e-bd236dbe11ba"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643165578,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "42cf5039-51a1-4af8-9c59-a83249d2e113": {
                  "id": "42cf5039-51a1-4af8-9c59-a83249d2e113",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "90_42cf5039-51a1-4af8-9c59-a83249d2e113.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643221687
            },
            "b995d483-23e2-402a-9356-6333f6a5d3b8": {
                  "id": "b995d483-23e2-402a-9356-6333f6a5d3b8",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "91_b995d483-23e2-402a-9356-6333f6a5d3b8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643221705
            },
            "14aaf53b-c84e-43aa-8dd8-2728a039a163": {
                  "id": "14aaf53b-c84e-43aa-8dd8-2728a039a163",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "92_14aaf53b-c84e-43aa-8dd8-2728a039a163.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643225560
            },
            "d21ce00b-f9ec-4d6a-9200-fdfe31a646ec": {
                  "id": "d21ce00b-f9ec-4d6a-9200-fdfe31a646ec",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "93_d21ce00b-f9ec-4d6a-9200-fdfe31a646ec.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643239911
            },
            "a700a0bc-be60-4518-bba9-a25d31f8da37": {
                  "id": "a700a0bc-be60-4518-bba9-a25d31f8da37",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "101_a700a0bc-be60-4518-bba9-a25d31f8da37.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643245184
            },
            "48d19938-9542-4b2b-8155-4b58f7e1acb8": {
                  "id": "48d19938-9542-4b2b-8155-4b58f7e1acb8",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "104_48d19938-9542-4b2b-8155-4b58f7e1acb8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643249203
            },
            "d4addeba-3c82-4ea6-84de-47e7be6317ea": {
                  "id": "d4addeba-3c82-4ea6-84de-47e7be6317ea",
                  "type": "ADD_ELEMENT",
                  "screenshot": "106_d4addeba-3c82-4ea6-84de-47e7be6317ea.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643251175
            },
            "247d5471-8fb4-43cd-bebb-9fdd53018899": {
                  "id": "247d5471-8fb4-43cd-bebb-9fdd53018899",
                  "type": "ADD_ELEMENT",
                  "screenshot": "107_247d5471-8fb4-43cd-bebb-9fdd53018899.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643253245
            },
            "5541c4ce-4372-4094-9b02-c22afade6cfc": {
                  "id": "5541c4ce-4372-4094-9b02-c22afade6cfc",
                  "type": "BEGIN_LINK",
                  "screenshot": "110_5541c4ce-4372-4094-9b02-c22afade6cfc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643270583
            },
            "c3dd4d39-1253-4338-8851-8e8c98f5966a": {
                  "id": "c3dd4d39-1253-4338-8851-8e8c98f5966a",
                  "type": "BEGIN_LINK",
                  "screenshot": "112_c3dd4d39-1253-4338-8851-8e8c98f5966a.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643272705
            },
            "b32b9a71-7e15-4597-ad73-3ecfdf6718ed": {
                  "id": "b32b9a71-7e15-4597-ad73-3ecfdf6718ed",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "117_b32b9a71-7e15-4597-ad73-3ecfdf6718ed.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b32b9a71-7e15-4597-ad73-3ecfdf6718ed"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643283029,
                  "submission_result": "failure/TEST",
                  "ticks": 5
            },
            "6d6376a9-7798-41cd-9f49-60111234f137": {
                  "id": "6d6376a9-7798-41cd-9f49-60111234f137",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "118_6d6376a9-7798-41cd-9f49-60111234f137.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643291522
            },
            "5dee801e-2c72-413f-bb61-fce3f359e4db": {
                  "id": "5dee801e-2c72-413f-bb61-fce3f359e4db",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "119_5dee801e-2c72-413f-bb61-fce3f359e4db.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643291539
            },
            "9e4b48b2-7530-47d6-a4aa-5d49e6a12039": {
                  "id": "9e4b48b2-7530-47d6-a4aa-5d49e6a12039",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "124_9e4b48b2-7530-47d6-a4aa-5d49e6a12039.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EA": 1,
                              "DC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9e4b48b2-7530-47d6-a4aa-5d49e6a12039"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643294540,
                  "submission_result": "failure/TEST",
                  "ticks": 172
            },
            "c9b7fd4f-4471-4f30-b4b2-3a77b145f355": {
                  "id": "c9b7fd4f-4471-4f30-b4b2-3a77b145f355",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "125_c9b7fd4f-4471-4f30-b4b2-3a77b145f355.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 2
                        },
                        "link_dict": {
                              "DA": 1,
                              "DC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643323035
            },
            "989af5c3-bc98-46b4-b440-2863ef81ee20": {
                  "id": "989af5c3-bc98-46b4-b440-2863ef81ee20",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "126_989af5c3-bc98-46b4-b440-2863ef81ee20.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643324758
            },
            "3202590f-c57f-46b6-a8d0-dcf6df62fb2e": {
                  "id": "3202590f-c57f-46b6-a8d0-dcf6df62fb2e",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "127_3202590f-c57f-46b6-a8d0-dcf6df62fb2e.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643326605
            },
            "6b44f318-9f01-4629-837a-546abb75ea30": {
                  "id": "6b44f318-9f01-4629-837a-546abb75ea30",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "132_6b44f318-9f01-4629-837a-546abb75ea30.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6b44f318-9f01-4629-837a-546abb75ea30"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643331459,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "dd4bcb1f-2d59-44df-9597-f8224ef99dd7": {
                  "id": "dd4bcb1f-2d59-44df-9597-f8224ef99dd7",
                  "type": "ADD_ELEMENT",
                  "screenshot": "133_dd4bcb1f-2d59-44df-9597-f8224ef99dd7.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643383349
            },
            "946ad5f2-970f-4da5-90d9-a9dfe31979b3": {
                  "id": "946ad5f2-970f-4da5-90d9-a9dfe31979b3",
                  "type": "ADD_ELEMENT",
                  "screenshot": "139_946ad5f2-970f-4da5-90d9-a9dfe31979b3.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643389546
            },
            "2054af64-2b77-4fe1-818a-7d0a90734465": {
                  "id": "2054af64-2b77-4fe1-818a-7d0a90734465",
                  "type": "BEGIN_LINK",
                  "screenshot": "140_2054af64-2b77-4fe1-818a-7d0a90734465.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1,
                              "HE": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643393556
            },
            "114592a7-2914-43c4-860b-dad4523a6c1d": {
                  "id": "114592a7-2914-43c4-860b-dad4523a6c1d",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "146_114592a7-2914-43c4-860b-dad4523a6c1d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1,
                              "HE": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "114592a7-2914-43c4-860b-dad4523a6c1d"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643400385,
                  "submission_result": "success/TEST",
                  "ticks": 81
            },
            "f28a3846-107b-46f0-aef1-5b17f46ff485": {
                  "id": "f28a3846-107b-46f0-aef1-5b17f46ff485",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "151_f28a3846-107b-46f0-aef1-5b17f46ff485.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaai": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaab"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaaa"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1,
                              "HE": 1
                        },
                        "board_ids": [
                              "f28a3846-107b-46f0-aef1-5b17f46ff485"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643439168,
                  "submission_result": "success/TEST",
                  "ticks": 81
            }
      },
      "64ea8334-1539-4f9c-a5fd-9788528f5c3f": {
            "6a6e4c53-24d8-4587-8388-a960fffeaf3e": {
                  "id": "6a6e4c53-24d8-4587-8388-a960fffeaf3e",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_6a6e4c53-24d8-4587-8388-a960fffeaf3e.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640148770
            },
            "b92622c7-8d33-4bdf-81f2-d9586f8372fc": {
                  "id": "b92622c7-8d33-4bdf-81f2-d9586f8372fc",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_b92622c7-8d33-4bdf-81f2-d9586f8372fc.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b92622c7-8d33-4bdf-81f2-d9586f8372fc"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640148875,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "08e10ae3-1a64-4f47-936c-e05b58b7957d": {
                  "id": "08e10ae3-1a64-4f47-936c-e05b58b7957d",
                  "type": "ADD_ELEMENT",
                  "screenshot": "4_08e10ae3-1a64-4f47-936c-e05b58b7957d.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640169298
            },
            "462b2c8d-85e4-44e5-868d-15fab1c95057": {
                  "id": "462b2c8d-85e4-44e5-868d-15fab1c95057",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_462b2c8d-85e4-44e5-868d-15fab1c95057.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640171355
            },
            "f2d69292-a481-42be-b594-24a92755ec5c": {
                  "id": "f2d69292-a481-42be-b594-24a92755ec5c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_f2d69292-a481-42be-b594-24a92755ec5c.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640176453
            },
            "cb800b9f-df75-4722-bda3-62580d08c0e3": {
                  "id": "cb800b9f-df75-4722-bda3-62580d08c0e3",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_cb800b9f-df75-4722-bda3-62580d08c0e3.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640178520
            },
            "c7fdd67b-72a2-43dd-827a-f5a49394b82c": {
                  "id": "c7fdd67b-72a2-43dd-827a-f5a49394b82c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "9_c7fdd67b-72a2-43dd-827a-f5a49394b82c.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640179957
            },
            "80c42295-679b-40e6-a748-403b6ac388d6": {
                  "id": "80c42295-679b-40e6-a748-403b6ac388d6",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "10_80c42295-679b-40e6-a748-403b6ac388d6.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640179960
            },
            "1dd9e4a2-13ef-4e41-b9a8-0bbe7261763a": {
                  "id": "1dd9e4a2-13ef-4e41-b9a8-0bbe7261763a",
                  "type": "BEGIN_LINK",
                  "screenshot": "11_1dd9e4a2-13ef-4e41-b9a8-0bbe7261763a.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640185285
            },
            "568ae921-bdb5-4b64-ba2b-ca2322a4f4eb": {
                  "id": "568ae921-bdb5-4b64-ba2b-ca2322a4f4eb",
                  "type": "BEGIN_LINK",
                  "screenshot": "13_568ae921-bdb5-4b64-ba2b-ca2322a4f4eb.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640187738
            },
            "ea074978-808c-4154-b9ac-ba2dc7fa3f76": {
                  "id": "ea074978-808c-4154-b9ac-ba2dc7fa3f76",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "19_ea074978-808c-4154-b9ac-ba2dc7fa3f76.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "ea074978-808c-4154-b9ac-ba2dc7fa3f76"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640205675,
                  "submission_result": "success/TEST",
                  "ticks": 74
            },
            "4dd21595-6e47-4d16-a634-b8ef5d557dd9": {
                  "id": "4dd21595-6e47-4d16-a634-b8ef5d557dd9",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "24_4dd21595-6e47-4d16-a634-b8ef5d557dd9.png",
                  "absolute_board_state": {
                        "aaaadc": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 4,
                              "status": "active"
                        },
                        "aaaadd": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 0,
                              "status": "inactive"
                        },
                        "aaaade": {
                              "type": "signal",
                              "element_x": 6,
                              "element_y": 0,
                              "link": "aaaadc"
                        },
                        "aaaadf": {
                              "type": "signal",
                              "element_x": 0,
                              "element_y": 6,
                              "link": "aaaadd"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "4dd21595-6e47-4d16-a634-b8ef5d557dd9"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624640216613,
                  "submission_result": "success/SUBMIT",
                  "ticks": 74
            }
      },
      "d0cd0662-ac0d-4d28-a799-3ed4a0495793": {
            "55f4cca7-88db-48dc-bd4d-c8870faa87a0": {
                  "id": "55f4cca7-88db-48dc-bd4d-c8870faa87a0",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_55f4cca7-88db-48dc-bd4d-c8870faa87a0.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622821478
            },
            "597bc317-eb45-4090-b81a-b2f4150cfd4e": {
                  "id": "597bc317-eb45-4090-b81a-b2f4150cfd4e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_597bc317-eb45-4090-b81a-b2f4150cfd4e.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "597bc317-eb45-4090-b81a-b2f4150cfd4e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622821511,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "1f472299-0067-4821-a38c-74847d8911a5": {
                  "id": "1f472299-0067-4821-a38c-74847d8911a5",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "7_1f472299-0067-4821-a38c-74847d8911a5.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623494730
            },
            "1944d25b-378a-4f97-adb3-38bc49858845": {
                  "id": "1944d25b-378a-4f97-adb3-38bc49858845",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "8_1944d25b-378a-4f97-adb3-38bc49858845.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1944d25b-378a-4f97-adb3-38bc49858845"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623494799,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "b310928f-5099-43df-bcc1-b9e2a7a26078": {
                  "id": "b310928f-5099-43df-bcc1-b9e2a7a26078",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_b310928f-5099-43df-bcc1-b9e2a7a26078.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623500683
            },
            "101351ce-530e-44a6-a792-69eb3f9fd84a": {
                  "id": "101351ce-530e-44a6-a792-69eb3f9fd84a",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_101351ce-530e-44a6-a792-69eb3f9fd84a.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623502391
            },
            "4e250415-4532-4e44-af75-4a194a867301": {
                  "id": "4e250415-4532-4e44-af75-4a194a867301",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "12_4e250415-4532-4e44-af75-4a194a867301.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623503087
            },
            "4f34817d-746d-4ae1-b21b-82fa502b37d8": {
                  "id": "4f34817d-746d-4ae1-b21b-82fa502b37d8",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "13_4f34817d-746d-4ae1-b21b-82fa502b37d8.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623503093
            },
            "aa15d7a7-f11e-4bd0-b1e6-da5e609864ae": {
                  "id": "aa15d7a7-f11e-4bd0-b1e6-da5e609864ae",
                  "type": "ADD_ELEMENT",
                  "screenshot": "14_aa15d7a7-f11e-4bd0-b1e6-da5e609864ae.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623509807
            },
            "5f5b8816-5b34-4172-b92c-72ff7803015c": {
                  "id": "5f5b8816-5b34-4172-b92c-72ff7803015c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "17_5f5b8816-5b34-4172-b92c-72ff7803015c.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623514637
            },
            "6b10751f-7c72-45c3-82da-0bce62255060": {
                  "id": "6b10751f-7c72-45c3-82da-0bce62255060",
                  "type": "BEGIN_LINK",
                  "screenshot": "18_6b10751f-7c72-45c3-82da-0bce62255060.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623524535
            },
            "9f576f16-763b-4b02-8ab4-c69e391ffc98": {
                  "id": "9f576f16-763b-4b02-8ab4-c69e391ffc98",
                  "type": "BEGIN_LINK",
                  "screenshot": "20_9f576f16-763b-4b02-8ab4-c69e391ffc98.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623528524
            },
            "40823cc1-0d6f-440a-b091-0c582e9ef478": {
                  "id": "40823cc1-0d6f-440a-b091-0c582e9ef478",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "26_40823cc1-0d6f-440a-b091-0c582e9ef478.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "40823cc1-0d6f-440a-b091-0c582e9ef478"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623533895,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "89ddbbcc-9698-4dfa-bd65-0370aa988d22": {
                  "id": "89ddbbcc-9698-4dfa-bd65-0370aa988d22",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "31_89ddbbcc-9698-4dfa-bd65-0370aa988d22.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "F": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "FC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "89ddbbcc-9698-4dfa-bd65-0370aa988d22"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623618057,
                  "submission_result": "success/SUBMIT",
                  "ticks": 78
            },
            "922122ea-99b6-4bb0-8934-6bea06f2a8dc": {
                  "id": "922122ea-99b6-4bb0-8934-6bea06f2a8dc",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "32_922122ea-99b6-4bb0-8934-6bea06f2a8dc.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623641464
            },
            "6e8c5c6d-7bdf-4388-a05c-d83517b91bf0": {
                  "id": "6e8c5c6d-7bdf-4388-a05c-d83517b91bf0",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "37_6e8c5c6d-7bdf-4388-a05c-d83517b91bf0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6e8c5c6d-7bdf-4388-a05c-d83517b91bf0"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623646510,
                  "submission_result": "success/TEST",
                  "ticks": 76
            },
            "dd708036-369d-48b0-88ff-2599938135e0": {
                  "id": "dd708036-369d-48b0-88ff-2599938135e0",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "42_dd708036-369d-48b0-88ff-2599938135e0.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "dd708036-369d-48b0-88ff-2599938135e0"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623656290,
                  "submission_result": "success/SUBMIT",
                  "ticks": 76
            },
            "1a7ef348-3d9f-47bb-85c2-dae165a4499c": {
                  "id": "1a7ef348-3d9f-47bb-85c2-dae165a4499c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "47_1a7ef348-3d9f-47bb-85c2-dae165a4499c.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1a7ef348-3d9f-47bb-85c2-dae165a4499c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623693473,
                  "submission_result": "success/TEST",
                  "ticks": 76
            },
            "894898d0-6d71-4c9d-b970-3a2333bfd86a": {
                  "id": "894898d0-6d71-4c9d-b970-3a2333bfd86a",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "51_894898d0-6d71-4c9d-b970-3a2333bfd86a.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "board_ids": [
                              "894898d0-6d71-4c9d-b970-3a2333bfd86a"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624623710981,
                  "submission_result": "success/SUBMIT",
                  "ticks": 76
            }
      },
      "0ba55f9b-be6f-4478-b31a-547ea6f64ef4": {
            "f40c8b72-50e2-4b92-a902-a226144432fd": {
                  "id": "f40c8b72-50e2-4b92-a902-a226144432fd",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_f40c8b72-50e2-4b92-a902-a226144432fd.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635518769
            },
            "0be69300-22b0-4188-8266-a6ddfe5549cb": {
                  "id": "0be69300-22b0-4188-8266-a6ddfe5549cb",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_0be69300-22b0-4188-8266-a6ddfe5549cb.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "0be69300-22b0-4188-8266-a6ddfe5549cb"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635518806,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "e1d71cf6-a092-4ae5-a7df-cdd6fe162f75": {
                  "id": "e1d71cf6-a092-4ae5-a7df-cdd6fe162f75",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_e1d71cf6-a092-4ae5-a7df-cdd6fe162f75.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635527943
            },
            "dac705ae-7271-43ff-a550-0e490b84eb9a": {
                  "id": "dac705ae-7271-43ff-a550-0e490b84eb9a",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_dac705ae-7271-43ff-a550-0e490b84eb9a.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635532613
            },
            "7a5b1ae3-2b55-4c58-aa40-a0f12416cad6": {
                  "id": "7a5b1ae3-2b55-4c58-aa40-a0f12416cad6",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_7a5b1ae3-2b55-4c58-aa40-a0f12416cad6.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635539213
            },
            "b298da21-1a6e-48cd-b109-c7f32adefd98": {
                  "id": "b298da21-1a6e-48cd-b109-c7f32adefd98",
                  "type": "ADD_ELEMENT",
                  "screenshot": "7_b298da21-1a6e-48cd-b109-c7f32adefd98.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635541919
            },
            "637a9b0e-b9fd-484f-b105-8c7da51f62b6": {
                  "id": "637a9b0e-b9fd-484f-b105-8c7da51f62b6",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "8_637a9b0e-b9fd-484f-b105-8c7da51f62b6.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635544012
            },
            "f3d00d3f-e0fa-4c99-9c53-53607691de47": {
                  "id": "f3d00d3f-e0fa-4c99-9c53-53607691de47",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "9_f3d00d3f-e0fa-4c99-9c53-53607691de47.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635544016
            },
            "0ee24c90-72a4-4534-bbe1-2dbef061b62b": {
                  "id": "0ee24c90-72a4-4534-bbe1-2dbef061b62b",
                  "type": "BEGIN_LINK",
                  "screenshot": "10_0ee24c90-72a4-4534-bbe1-2dbef061b62b.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635547672
            },
            "d0cc5d04-e7b8-4b0e-90eb-0f8e0490c11e": {
                  "id": "d0cc5d04-e7b8-4b0e-90eb-0f8e0490c11e",
                  "type": "BEGIN_LINK",
                  "screenshot": "12_d0cc5d04-e7b8-4b0e-90eb-0f8e0490c11e.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635550100
            },
            "2859e968-727c-436a-a5f4-48d238bded39": {
                  "id": "2859e968-727c-436a-a5f4-48d238bded39",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "18_2859e968-727c-436a-a5f4-48d238bded39.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "2859e968-727c-436a-a5f4-48d238bded39"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635554509,
                  "submission_result": "success/TEST",
                  "ticks": 81
            },
            "2e2e0548-7e61-4be1-85a0-3a0668f3367e": {
                  "id": "2e2e0548-7e61-4be1-85a0-3a0668f3367e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "23_2e2e0548-7e61-4be1-85a0-3a0668f3367e.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "2e2e0548-7e61-4be1-85a0-3a0668f3367e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635644298,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 245
            },
            "4d212af9-f56b-44d4-a371-cb8f91ccbe5b": {
                  "id": "4d212af9-f56b-44d4-a371-cb8f91ccbe5b",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "24_4d212af9-f56b-44d4-a371-cb8f91ccbe5b.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635672108
            },
            "353a5609-ae2c-4a10-bd8f-c20ad8f921aa": {
                  "id": "353a5609-ae2c-4a10-bd8f-c20ad8f921aa",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "25_353a5609-ae2c-4a10-bd8f-c20ad8f921aa.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635674097
            },
            "9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77": {
                  "id": "9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "30_9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9e3a7189-b22d-4cf1-b98c-b78dcbd5bb77"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635695229,
                  "submission_result": "success/TEST",
                  "ticks": 79
            },
            "aae671a0-04eb-4fb1-bcaa-74fc435bf802": {
                  "id": "aae671a0-04eb-4fb1-bcaa-74fc435bf802",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "35_aae671a0-04eb-4fb1-bcaa-74fc435bf802.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "aae671a0-04eb-4fb1-bcaa-74fc435bf802"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635761927,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 245
            },
            "0bf3b86b-efd6-43e9-b176-fd459f96065e": {
                  "id": "0bf3b86b-efd6-43e9-b176-fd459f96065e",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "36_0bf3b86b-efd6-43e9-b176-fd459f96065e.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635765895
            },
            "a9de5293-8dd4-4930-b7ae-10d138378f2c": {
                  "id": "a9de5293-8dd4-4930-b7ae-10d138378f2c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "37_a9de5293-8dd4-4930-b7ae-10d138378f2c.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635775394
            },
            "d931ace6-beb4-4c79-be1d-1b5bb4fabbc3": {
                  "id": "d931ace6-beb4-4c79-be1d-1b5bb4fabbc3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "42_d931ace6-beb4-4c79-be1d-1b5bb4fabbc3.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "d931ace6-beb4-4c79-be1d-1b5bb4fabbc3"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635786476,
                  "submission_result": "success/TEST",
                  "ticks": 150
            },
            "1e01ec66-2765-4820-b808-ffc403bd71cf": {
                  "id": "1e01ec66-2765-4820-b808-ffc403bd71cf",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "47_1e01ec66-2765-4820-b808-ffc403bd71cf.png",
                  "absolute_board_state": {
                        "aaaabw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1e01ec66-2765-4820-b808-ffc403bd71cf"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635791991,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 245
            },
            "6d208e42-94ff-497f-99f8-7f0dcf2a323c": {
                  "id": "6d208e42-94ff-497f-99f8-7f0dcf2a323c",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "49_6d208e42-94ff-497f-99f8-7f0dcf2a323c.png",
                  "absolute_board_state": {
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaby": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 4,
                              "link": null
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635871011
            },
            "e19fa176-4f6b-4dd3-ab72-f63135feab05": {
                  "id": "e19fa176-4f6b-4dd3-ab72-f63135feab05",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "53_e19fa176-4f6b-4dd3-ab72-f63135feab05.png",
                  "absolute_board_state": {
                        "aaaabx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635874243
            },
            "721e0ae6-4fdc-4842-93d7-0d7d42dc8c45": {
                  "id": "721e0ae6-4fdc-4842-93d7-0d7d42dc8c45",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "56_721e0ae6-4fdc-4842-93d7-0d7d42dc8c45.png",
                  "absolute_board_state": {
                        "aaaabz": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 1,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635876633
            },
            "dcab3bb6-266b-498b-a227-ab90c0880087": {
                  "id": "dcab3bb6-266b-498b-a227-ab90c0880087",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "58_dcab3bb6-266b-498b-a227-ab90c0880087.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635878815
            },
            "82b9d865-aef4-4920-adbe-5195621055e1": {
                  "id": "82b9d865-aef4-4920-adbe-5195621055e1",
                  "type": "ADD_ELEMENT",
                  "screenshot": "60_82b9d865-aef4-4920-adbe-5195621055e1.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635882354
            },
            "53f8c390-1a08-4f4e-9590-10cfa448dac2": {
                  "id": "53f8c390-1a08-4f4e-9590-10cfa448dac2",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "61_53f8c390-1a08-4f4e-9590-10cfa448dac2.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635883413
            },
            "c1c96d27-488a-43d4-8f15-1977c05a1344": {
                  "id": "c1c96d27-488a-43d4-8f15-1977c05a1344",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "62_c1c96d27-488a-43d4-8f15-1977c05a1344.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635883420
            },
            "ea971f9e-606f-4e2d-a912-f008782188d9": {
                  "id": "ea971f9e-606f-4e2d-a912-f008782188d9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "63_ea971f9e-606f-4e2d-a912-f008782188d9.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635886085
            },
            "7d003c06-3121-4ec4-881c-8cf675eb3d28": {
                  "id": "7d003c06-3121-4ec4-881c-8cf675eb3d28",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "64_7d003c06-3121-4ec4-881c-8cf675eb3d28.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635887044
            },
            "3bf55121-76ee-48b4-899a-60ec0cfa7274": {
                  "id": "3bf55121-76ee-48b4-899a-60ec0cfa7274",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "65_3bf55121-76ee-48b4-899a-60ec0cfa7274.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635887052
            },
            "43cd67b6-2881-41e9-8262-88bf4589c3fa": {
                  "id": "43cd67b6-2881-41e9-8262-88bf4589c3fa",
                  "type": "ADD_ELEMENT",
                  "screenshot": "66_43cd67b6-2881-41e9-8262-88bf4589c3fa.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635895410
            },
            "a6423e20-0c1e-4db2-98b3-eed733ad766e": {
                  "id": "a6423e20-0c1e-4db2-98b3-eed733ad766e",
                  "type": "ADD_ELEMENT",
                  "screenshot": "67_a6423e20-0c1e-4db2-98b3-eed733ad766e.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635897579
            },
            "e79123ef-0abd-4170-a7b7-b4dbf2d66911": {
                  "id": "e79123ef-0abd-4170-a7b7-b4dbf2d66911",
                  "type": "ADD_ELEMENT",
                  "screenshot": "72_e79123ef-0abd-4170-a7b7-b4dbf2d66911.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635908456
            },
            "12c0dffe-6984-4bdd-9728-beaf4c6c5000": {
                  "id": "12c0dffe-6984-4bdd-9728-beaf4c6c5000",
                  "type": "ADD_ELEMENT",
                  "screenshot": "73_12c0dffe-6984-4bdd-9728-beaf4c6c5000.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635911899
            },
            "c867b306-a93d-416a-995c-5e577dcb2011": {
                  "id": "c867b306-a93d-416a-995c-5e577dcb2011",
                  "type": "BEGIN_LINK",
                  "screenshot": "74_c867b306-a93d-416a-995c-5e577dcb2011.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EH": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635918340
            },
            "06812bf9-4c70-433a-9224-13a58c327555": {
                  "id": "06812bf9-4c70-433a-9224-13a58c327555",
                  "type": "BEGIN_LINK",
                  "screenshot": "76_06812bf9-4c70-433a-9224-13a58c327555.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EH": 1,
                              "DF": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635920747
            },
            "6579a28f-bbf8-40e3-a7b9-7d6d67caec82": {
                  "id": "6579a28f-bbf8-40e3-a7b9-7d6d67caec82",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "82_6579a28f-bbf8-40e3-a7b9-7d6d67caec82.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EH": 1,
                              "DF": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6579a28f-bbf8-40e3-a7b9-7d6d67caec82"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635956394,
                  "submission_result": "success/TEST",
                  "ticks": 121
            },
            "9be107b9-da31-4875-a587-6f2996961b02": {
                  "id": "9be107b9-da31-4875-a587-6f2996961b02",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "87_9be107b9-da31-4875-a587-6f2996961b02.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaaci": {
                              "type": "semaphore",
                              "element_x": 6,
                              "element_y": 5,
                              "status": "inactive"
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "H": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EH": 1,
                              "DF": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9be107b9-da31-4875-a587-6f2996961b02"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624635962339,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 111
            },
            "d0710503-9f7d-4c46-88be-f63a99e2aee8": {
                  "id": "d0710503-9f7d-4c46-88be-f63a99e2aee8",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "90_d0710503-9f7d-4c46-88be-f63a99e2aee8.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        },
                        "aaaacj": {
                              "type": "semaphore",
                              "element_x": 5,
                              "element_y": 6,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "F": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DF": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636053249
            },
            "fa0e69e1-69e6-41c1-ba63-9d163eb1d809": {
                  "id": "fa0e69e1-69e6-41c1-ba63-9d163eb1d809",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "97_fa0e69e1-69e6-41c1-ba63-9d163eb1d809.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaacg": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": null
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636056146
            },
            "6320ffee-36a3-4bb1-952b-e74a77fbd9f1": {
                  "id": "6320ffee-36a3-4bb1-952b-e74a77fbd9f1",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "99_6320ffee-36a3-4bb1-952b-e74a77fbd9f1.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaach": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": null
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636059578
            },
            "74073a63-3ae1-4b81-bc96-ca4f8bbb441f": {
                  "id": "74073a63-3ae1-4b81-bc96-ca4f8bbb441f",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "101_74073a63-3ae1-4b81-bc96-ca4f8bbb441f.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636061840
            },
            "963311ac-c7d7-43dd-b421-9db2ef91f14a": {
                  "id": "963311ac-c7d7-43dd-b421-9db2ef91f14a",
                  "type": "ADD_ELEMENT",
                  "screenshot": "103_963311ac-c7d7-43dd-b421-9db2ef91f14a.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636069284
            },
            "7f22b2c5-eb4f-4d62-aeff-67f7988f8021": {
                  "id": "7f22b2c5-eb4f-4d62-aeff-67f7988f8021",
                  "type": "ADD_ELEMENT",
                  "screenshot": "104_7f22b2c5-eb4f-4d62-aeff-67f7988f8021.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636071886
            },
            "c29f9da6-4e24-459b-9372-61e98f3718d4": {
                  "id": "c29f9da6-4e24-459b-9372-61e98f3718d4",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "105_c29f9da6-4e24-459b-9372-61e98f3718d4.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636075017
            },
            "3b5fbcbd-ec8d-4152-bfa7-e3ecd3e80f8b": {
                  "id": "3b5fbcbd-ec8d-4152-bfa7-e3ecd3e80f8b",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "106_3b5fbcbd-ec8d-4152-bfa7-e3ecd3e80f8b.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636075026
            },
            "29968b88-2969-4506-95a4-4fb179c94cbb": {
                  "id": "29968b88-2969-4506-95a4-4fb179c94cbb",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "107_29968b88-2969-4506-95a4-4fb179c94cbb.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636090606
            },
            "19a7a2a4-bd7b-4415-b3f7-050b6de8d929": {
                  "id": "19a7a2a4-bd7b-4415-b3f7-050b6de8d929",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "108_19a7a2a4-bd7b-4415-b3f7-050b6de8d929.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636094527
            },
            "4f701b60-8fae-407a-9248-48781fad14bb": {
                  "id": "4f701b60-8fae-407a-9248-48781fad14bb",
                  "type": "ADD_ELEMENT",
                  "screenshot": "110_4f701b60-8fae-407a-9248-48781fad14bb.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636099698
            },
            "48bb49f2-b989-4d2b-b8a2-6723964aa4ec": {
                  "id": "48bb49f2-b989-4d2b-b8a2-6723964aa4ec",
                  "type": "ADD_ELEMENT",
                  "screenshot": "111_48bb49f2-b989-4d2b-b8a2-6723964aa4ec.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636102506
            },
            "5b20ec6f-dd4e-47aa-8a46-5d27b4e7518d": {
                  "id": "5b20ec6f-dd4e-47aa-8a46-5d27b4e7518d",
                  "type": "BEGIN_LINK",
                  "screenshot": "112_5b20ec6f-dd4e-47aa-8a46-5d27b4e7518d.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636107754
            },
            "90cf3e4d-87d7-4620-88d1-45562b756bcf": {
                  "id": "90cf3e4d-87d7-4620-88d1-45562b756bcf",
                  "type": "BEGIN_LINK",
                  "screenshot": "114_90cf3e4d-87d7-4620-88d1-45562b756bcf.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636112202
            },
            "7d37d945-eef1-419a-b3ce-dcc23c031602": {
                  "id": "7d37d945-eef1-419a-b3ce-dcc23c031602",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "120_7d37d945-eef1-419a-b3ce-dcc23c031602.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "7d37d945-eef1-419a-b3ce-dcc23c031602"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636128180,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362": {
                  "id": "8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "125_8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362.png",
                  "absolute_board_state": {
                        "aaaace": {
                              "type": "semaphore",
                              "element_x": 7,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "G": 1,
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "8d4f8b6e-a7a1-4fe1-a95d-8ccfbd857362"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636164935,
                  "submission_result": "success/SUBMIT",
                  "ticks": 78
            },
            "20771489-29dc-4255-a71e-a99054e13d27": {
                  "id": "20771489-29dc-4255-a71e-a99054e13d27",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "126_20771489-29dc-4255-a71e-a99054e13d27.png",
                  "absolute_board_state": {
                        "aaaacf": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 7,
                              "status": "active"
                        },
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "B": 1,
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636266201
            },
            "f41e5500-dc59-4344-a4de-d9fb9578c7ad": {
                  "id": "f41e5500-dc59-4344-a4de-d9fb9578c7ad",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "128_f41e5500-dc59-4344-a4de-d9fb9578c7ad.png",
                  "absolute_board_state": {
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacp": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636268581
            },
            "e1c0fcc0-44c0-4f49-82c9-b0f7b94d6902": {
                  "id": "e1c0fcc0-44c0-4f49-82c9-b0f7b94d6902",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "133_e1c0fcc0-44c0-4f49-82c9-b0f7b94d6902.png",
                  "absolute_board_state": {
                        "aaaaco": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636277911
            },
            "faad452c-b33b-4d94-be0d-0906a20780e1": {
                  "id": "faad452c-b33b-4d94-be0d-0906a20780e1",
                  "type": "REMOVE_ELEMENT",
                  "screenshot": "136_faad452c-b33b-4d94-be0d-0906a20780e1.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636280068
            },
            "8970e921-27fc-43b4-bbfe-167c62dff099": {
                  "id": "8970e921-27fc-43b4-bbfe-167c62dff099",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "139_8970e921-27fc-43b4-bbfe-167c62dff099.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636287598
            },
            "becbaf41-7042-486f-9569-e451fdc0193a": {
                  "id": "becbaf41-7042-486f-9569-e451fdc0193a",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "140_becbaf41-7042-486f-9569-e451fdc0193a.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 2,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636290055
            },
            "57986644-2cea-4a50-be3e-8cc68d09f01b": {
                  "id": "57986644-2cea-4a50-be3e-8cc68d09f01b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "141_57986644-2cea-4a50-be3e-8cc68d09f01b.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636297062
            },
            "2f22fade-e593-44d9-8531-812fa2bb5d2b": {
                  "id": "2f22fade-e593-44d9-8531-812fa2bb5d2b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "142_2f22fade-e593-44d9-8531-812fa2bb5d2b.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636299373
            },
            "9308676d-8535-4d66-aaec-8e077a2b6b22": {
                  "id": "9308676d-8535-4d66-aaec-8e077a2b6b22",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "143_9308676d-8535-4d66-aaec-8e077a2b6b22.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636304231
            },
            "94c073a4-4e3d-4070-b91b-132b9265fef9": {
                  "id": "94c073a4-4e3d-4070-b91b-132b9265fef9",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "144_94c073a4-4e3d-4070-b91b-132b9265fef9.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636304247
            },
            "5b1673c7-e993-46ee-9692-4f053ffa574a": {
                  "id": "5b1673c7-e993-46ee-9692-4f053ffa574a",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "145_5b1673c7-e993-46ee-9692-4f053ffa574a.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636312067
            },
            "62118aba-5df0-4edb-b331-850125353ad3": {
                  "id": "62118aba-5df0-4edb-b331-850125353ad3",
                  "type": "BEGIN_LINK",
                  "screenshot": "146_62118aba-5df0-4edb-b331-850125353ad3.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636313502
            },
            "8b51f184-3e34-4ba9-b067-7ce11f42d9d1": {
                  "id": "8b51f184-3e34-4ba9-b067-7ce11f42d9d1",
                  "type": "BEGIN_LINK",
                  "screenshot": "148_8b51f184-3e34-4ba9-b067-7ce11f42d9d1.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636319237
            },
            "1f95841a-7c32-4b5f-a224-d31c8a93bc39": {
                  "id": "1f95841a-7c32-4b5f-a224-d31c8a93bc39",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "154_1f95841a-7c32-4b5f-a224-d31c8a93bc39.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1f95841a-7c32-4b5f-a224-d31c8a93bc39"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636343190,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "f1a88354-b996-4e18-8e12-79d971d286ff": {
                  "id": "f1a88354-b996-4e18-8e12-79d971d286ff",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "159_f1a88354-b996-4e18-8e12-79d971d286ff.png",
                  "absolute_board_state": {
                        "aaaacq": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacx"
                        },
                        "aaaacr": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaacw"
                        },
                        "aaaacw": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacx": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "f1a88354-b996-4e18-8e12-79d971d286ff"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624636352547,
                  "submission_result": "success/SUBMIT",
                  "ticks": 77
            }
      },
      "2e07ba3c-51be-498f-815a-768f3b7cb7e1": {
            "2eba395a-3463-45b2-9b14-007564eac48f": {
                  "id": "2eba395a-3463-45b2-9b14-007564eac48f",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_2eba395a-3463-45b2-9b14-007564eac48f.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644673111
            },
            "ea5aa89f-e29d-47a8-ae21-abdd11a36442": {
                  "id": "ea5aa89f-e29d-47a8-ae21-abdd11a36442",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_ea5aa89f-e29d-47a8-ae21-abdd11a36442.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "ea5aa89f-e29d-47a8-ae21-abdd11a36442"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644673142,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "0ef1794a-ad2c-4c25-a07c-380a543f0428": {
                  "id": "0ef1794a-ad2c-4c25-a07c-380a543f0428",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_0ef1794a-ad2c-4c25-a07c-380a543f0428.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644715328
            },
            "1d3c4796-d7f5-4c9d-9345-aa02d530d611": {
                  "id": "1d3c4796-d7f5-4c9d-9345-aa02d530d611",
                  "type": "ADD_ELEMENT",
                  "screenshot": "6_1d3c4796-d7f5-4c9d-9345-aa02d530d611.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644717144
            },
            "238f822e-5058-4a30-8547-6c942720fdd3": {
                  "id": "238f822e-5058-4a30-8547-6c942720fdd3",
                  "type": "ADD_ELEMENT",
                  "screenshot": "7_238f822e-5058-4a30-8547-6c942720fdd3.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644719300
            },
            "1482d6aa-55a3-443f-b1b6-569e55d31983": {
                  "id": "1482d6aa-55a3-443f-b1b6-569e55d31983",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_1482d6aa-55a3-443f-b1b6-569e55d31983.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644721566
            },
            "0ef68a06-6aac-4ff0-a553-a56a39472c6c": {
                  "id": "0ef68a06-6aac-4ff0-a553-a56a39472c6c",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "11_0ef68a06-6aac-4ff0-a553-a56a39472c6c.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644730795
            },
            "53e57409-51d0-4cc5-9331-522ec9d2a8df": {
                  "id": "53e57409-51d0-4cc5-9331-522ec9d2a8df",
                  "type": "BEGIN_LINK",
                  "screenshot": "12_53e57409-51d0-4cc5-9331-522ec9d2a8df.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644731386
            },
            "e7272ffe-0ed3-4aa9-853b-6dbc06774568": {
                  "id": "e7272ffe-0ed3-4aa9-853b-6dbc06774568",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_e7272ffe-0ed3-4aa9-853b-6dbc06774568.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644733924
            },
            "8cce4560-586f-4239-a067-f0e2aabd3485": {
                  "id": "8cce4560-586f-4239-a067-f0e2aabd3485",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "19_8cce4560-586f-4239-a067-f0e2aabd3485.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "8cce4560-586f-4239-a067-f0e2aabd3485"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644736754,
                  "submission_result": "failure/TEST",
                  "ticks": 5
            },
            "cbdef2bb-b049-474e-92c1-0643b023aa80": {
                  "id": "cbdef2bb-b049-474e-92c1-0643b023aa80",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "20_cbdef2bb-b049-474e-92c1-0643b023aa80.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644752860
            },
            "f117f0dc-b0d3-485f-9e2a-adacf636a55a": {
                  "id": "f117f0dc-b0d3-485f-9e2a-adacf636a55a",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "21_f117f0dc-b0d3-485f-9e2a-adacf636a55a.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644752869
            },
            "c987707b-a66b-4466-afde-2638747aa92b": {
                  "id": "c987707b-a66b-4466-afde-2638747aa92b",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "28_c987707b-a66b-4466-afde-2638747aa92b.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c987707b-a66b-4466-afde-2638747aa92b"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644768954,
                  "submission_result": "success/TEST",
                  "ticks": 78
            },
            "dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1": {
                  "id": "dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "33_dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "dbed9f1f-9a1e-4e1f-a009-49ca1f1766a1"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644788838,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 240
            },
            "7dff531d-6465-42f1-93bd-091c5185e0f2": {
                  "id": "7dff531d-6465-42f1-93bd-091c5185e0f2",
                  "type": "ADD_ELEMENT",
                  "screenshot": "34_7dff531d-6465-42f1-93bd-091c5185e0f2.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644836881
            },
            "5432c0c5-1b74-43be-8b99-030d75993e80": {
                  "id": "5432c0c5-1b74-43be-8b99-030d75993e80",
                  "type": "ADD_ELEMENT",
                  "screenshot": "35_5432c0c5-1b74-43be-8b99-030d75993e80.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644839802
            },
            "1f6cf1f7-f254-41eb-abc2-82245d6f17e6": {
                  "id": "1f6cf1f7-f254-41eb-abc2-82245d6f17e6",
                  "type": "ADD_ELEMENT",
                  "screenshot": "36_1f6cf1f7-f254-41eb-abc2-82245d6f17e6.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644846943
            },
            "31a9a9ed-a0fa-4b63-8415-026d8061bd86": {
                  "id": "31a9a9ed-a0fa-4b63-8415-026d8061bd86",
                  "type": "ADD_ELEMENT",
                  "screenshot": "37_31a9a9ed-a0fa-4b63-8415-026d8061bd86.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644850795
            },
            "5957c5a8-6bc2-4ecc-9166-8b2c114e375e": {
                  "id": "5957c5a8-6bc2-4ecc-9166-8b2c114e375e",
                  "type": "BEGIN_LINK",
                  "screenshot": "38_5957c5a8-6bc2-4ecc-9166-8b2c114e375e.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644854419
            },
            "00ebf114-00e0-4f80-9b15-b18529d03b75": {
                  "id": "00ebf114-00e0-4f80-9b15-b18529d03b75",
                  "type": "BEGIN_LINK",
                  "screenshot": "40_00ebf114-00e0-4f80-9b15-b18529d03b75.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644858393
            },
            "aaea46b2-0137-486b-9cc4-91afe0ccec45": {
                  "id": "aaea46b2-0137-486b-9cc4-91afe0ccec45",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "45_aaea46b2-0137-486b-9cc4-91afe0ccec45.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "aaea46b2-0137-486b-9cc4-91afe0ccec45"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644871248,
                  "submission_result": "failure/TEST",
                  "ticks": 7
            },
            "8e0c223c-e435-4f04-a9f1-6f4a9b761dce": {
                  "id": "8e0c223c-e435-4f04-a9f1-6f4a9b761dce",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "46_8e0c223c-e435-4f04-a9f1-6f4a9b761dce.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644886256
            },
            "9925d067-67ea-4fa3-ba56-3afbed3d0291": {
                  "id": "9925d067-67ea-4fa3-ba56-3afbed3d0291",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "47_9925d067-67ea-4fa3-ba56-3afbed3d0291.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644886264
            },
            "075b44e9-ef68-4a30-84a1-6895955778a3": {
                  "id": "075b44e9-ef68-4a30-84a1-6895955778a3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "52_075b44e9-ef68-4a30-84a1-6895955778a3.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "075b44e9-ef68-4a30-84a1-6895955778a3"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644893242,
                  "submission_result": "success/TEST",
                  "ticks": 84
            },
            "ae7e8247-aafc-486e-857a-f073f1753150": {
                  "id": "ae7e8247-aafc-486e-857a-f073f1753150",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "57_ae7e8247-aafc-486e-857a-f073f1753150.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "ae7e8247-aafc-486e-857a-f073f1753150"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644936311,
                  "submission_result": "success/SUBMIT",
                  "ticks": 82
            },
            "73c40845-5604-49d1-bbf1-9eabf0cfe3cb": {
                  "id": "73c40845-5604-49d1-bbf1-9eabf0cfe3cb",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "58_73c40845-5604-49d1-bbf1-9eabf0cfe3cb.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644980636
            },
            "023a3dd8-f4d1-431d-bb75-58d257e2e39d": {
                  "id": "023a3dd8-f4d1-431d-bb75-58d257e2e39d",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "63_023a3dd8-f4d1-431d-bb75-58d257e2e39d.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "023a3dd8-f4d1-431d-bb75-58d257e2e39d"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644993873,
                  "submission_result": "success/TEST",
                  "ticks": 82
            },
            "86638d5a-050a-404b-82db-1db04836b4a2": {
                  "id": "86638d5a-050a-404b-82db-1db04836b4a2",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "68_86638d5a-050a-404b-82db-1db04836b4a2.png",
                  "absolute_board_state": {
                        "aaaabk": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaabl": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabm": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaabk"
                        },
                        "aaaabn": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaabl"
                        },
                        "aaaabs": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaabt": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabu": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaabt"
                        },
                        "aaaabv": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaabs"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 4,
                        "nSignals": 4,
                        "semaphore_zone_dict": {
                              "C": 2,
                              "A": 2
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "86638d5a-050a-404b-82db-1db04836b4a2"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645003701,
                  "submission_result": "success/SUBMIT",
                  "ticks": 82
            }
      },
      "787785b5-e800-45e2-82dd-9001eae092ef": {
            "a3089a72-baca-457e-9cd8-9a6eea70f39c": {
                  "id": "a3089a72-baca-457e-9cd8-9a6eea70f39c",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_a3089a72-baca-457e-9cd8-9a6eea70f39c.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624611424095
            },
            "e48a9ee9-88d9-458a-90f6-310ac1648388": {
                  "id": "e48a9ee9-88d9-458a-90f6-310ac1648388",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_e48a9ee9-88d9-458a-90f6-310ac1648388.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "e48a9ee9-88d9-458a-90f6-310ac1648388"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624611424135,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "3d1b3c40-cabb-4422-a1e5-35124adf959e": {
                  "id": "3d1b3c40-cabb-4422-a1e5-35124adf959e",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "5_3d1b3c40-cabb-4422-a1e5-35124adf959e.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613067924
            },
            "1bbe52c7-1cbb-4815-a466-de2653227b76": {
                  "id": "1bbe52c7-1cbb-4815-a466-de2653227b76",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "6_1bbe52c7-1cbb-4815-a466-de2653227b76.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1bbe52c7-1cbb-4815-a466-de2653227b76"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613067976,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "48910fda-c6cc-4d8f-b53b-374afbece59f": {
                  "id": "48910fda-c6cc-4d8f-b53b-374afbece59f",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_48910fda-c6cc-4d8f-b53b-374afbece59f.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613073134
            },
            "f5f7f38b-b1c2-49a1-a083-881b19982ef9": {
                  "id": "f5f7f38b-b1c2-49a1-a083-881b19982ef9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "9_f5f7f38b-b1c2-49a1-a083-881b19982ef9.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613075892
            },
            "271d1442-7860-4521-a0e9-5ad1a5be492c": {
                  "id": "271d1442-7860-4521-a0e9-5ad1a5be492c",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_271d1442-7860-4521-a0e9-5ad1a5be492c.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613078902
            },
            "70585a73-e891-4f29-a410-142ca3bd1e12": {
                  "id": "70585a73-e891-4f29-a410-142ca3bd1e12",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_70585a73-e891-4f29-a410-142ca3bd1e12.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613081594
            },
            "db112d8e-0447-4cda-bbbe-0e919b928666": {
                  "id": "db112d8e-0447-4cda-bbbe-0e919b928666",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "12_db112d8e-0447-4cda-bbbe-0e919b928666.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613084791
            },
            "f499ba54-d427-4651-b74f-e8b90a641b90": {
                  "id": "f499ba54-d427-4651-b74f-e8b90a641b90",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "13_f499ba54-d427-4651-b74f-e8b90a641b90.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613084796
            },
            "7cf61aad-5ce7-4ffd-b8ea-b1f8e3d5bb36": {
                  "id": "7cf61aad-5ce7-4ffd-b8ea-b1f8e3d5bb36",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_7cf61aad-5ce7-4ffd-b8ea-b1f8e3d5bb36.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613089517
            },
            "58488058-4a5a-4572-ab7f-937c9ff106c9": {
                  "id": "58488058-4a5a-4572-ab7f-937c9ff106c9",
                  "type": "BEGIN_LINK",
                  "screenshot": "16_58488058-4a5a-4572-ab7f-937c9ff106c9.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613092421
            },
            "d922b07d-cf25-445f-93a7-f5d8fdf6a62d": {
                  "id": "d922b07d-cf25-445f-93a7-f5d8fdf6a62d",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "22_d922b07d-cf25-445f-93a7-f5d8fdf6a62d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "d922b07d-cf25-445f-93a7-f5d8fdf6a62d"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613100918,
                  "submission_result": "success/TEST",
                  "ticks": 79
            },
            "842b987f-f501-4733-b9eb-cb95bf531308": {
                  "id": "842b987f-f501-4733-b9eb-cb95bf531308",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "27_842b987f-f501-4733-b9eb-cb95bf531308.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaac": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 3,
                              "link": "aaaaab"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 2,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "board_ids": [
                              "842b987f-f501-4733-b9eb-cb95bf531308"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624613109456,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 244
            }
      },
      "4666e412-31ab-421b-b335-b30c7c322bdd": {
            "74d2c95e-3066-48f8-aa42-e52198d5db50": {
                  "id": "74d2c95e-3066-48f8-aa42-e52198d5db50",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_74d2c95e-3066-48f8-aa42-e52198d5db50.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633071907
            },
            "00cedd67-4118-4bb2-948e-74bef8707793": {
                  "id": "00cedd67-4118-4bb2-948e-74bef8707793",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_00cedd67-4118-4bb2-948e-74bef8707793.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "00cedd67-4118-4bb2-948e-74bef8707793"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633071936,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "ed903e9c-50b4-484d-9eb3-93968f8647a5": {
                  "id": "ed903e9c-50b4-484d-9eb3-93968f8647a5",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "7_ed903e9c-50b4-484d-9eb3-93968f8647a5.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "ed903e9c-50b4-484d-9eb3-93968f8647a5"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633077035,
                  "submission_result": "failure/TEST",
                  "ticks": 195
            },
            "738a6fe0-455e-41ee-a20d-258062997ec8": {
                  "id": "738a6fe0-455e-41ee-a20d-258062997ec8",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_738a6fe0-455e-41ee-a20d-258062997ec8.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633123516
            },
            "54e5f172-90ee-436a-9f89-b04f44e9c1d5": {
                  "id": "54e5f172-90ee-436a-9f89-b04f44e9c1d5",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "9_54e5f172-90ee-436a-9f89-b04f44e9c1d5.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633124091
            },
            "3d393d56-36c1-447d-9ca9-4aa05b4f1b94": {
                  "id": "3d393d56-36c1-447d-9ca9-4aa05b4f1b94",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "10_3d393d56-36c1-447d-9ca9-4aa05b4f1b94.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633124097
            },
            "580575c7-ca15-47f9-8dc2-8f9b6d1c3960": {
                  "id": "580575c7-ca15-47f9-8dc2-8f9b6d1c3960",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_580575c7-ca15-47f9-8dc2-8f9b6d1c3960.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633126227
            },
            "cf8ebc43-dae8-476b-a3ff-6ba3106cef60": {
                  "id": "cf8ebc43-dae8-476b-a3ff-6ba3106cef60",
                  "type": "ADD_ELEMENT",
                  "screenshot": "12_cf8ebc43-dae8-476b-a3ff-6ba3106cef60.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633133564
            },
            "ae93bac5-58b5-49e1-ad2c-957e3c274490": {
                  "id": "ae93bac5-58b5-49e1-ad2c-957e3c274490",
                  "type": "ADD_ELEMENT",
                  "screenshot": "13_ae93bac5-58b5-49e1-ad2c-957e3c274490.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaq"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633138931
            },
            "f904f6f5-ea63-4444-ba1c-69e9b51f18e1": {
                  "id": "f904f6f5-ea63-4444-ba1c-69e9b51f18e1",
                  "type": "BEGIN_LINK",
                  "screenshot": "14_f904f6f5-ea63-4444-ba1c-69e9b51f18e1.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaq"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633151932
            },
            "4e86edce-0051-4648-9be3-6686f8985efc": {
                  "id": "4e86edce-0051-4648-9be3-6686f8985efc",
                  "type": "BEGIN_LINK",
                  "screenshot": "16_4e86edce-0051-4648-9be3-6686f8985efc.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaq"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633154303
            },
            "42daf75c-156d-4f40-bf19-54d56edebd2c": {
                  "id": "42daf75c-156d-4f40-bf19-54d56edebd2c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "22_42daf75c-156d-4f40-bf19-54d56edebd2c.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaq"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "42daf75c-156d-4f40-bf19-54d56edebd2c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633160527,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "fafd80b7-f84a-4818-bf50-f5c3762967dc": {
                  "id": "fafd80b7-f84a-4818-bf50-f5c3762967dc",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "27_fafd80b7-f84a-4818-bf50-f5c3762967dc.png",
                  "absolute_board_state": {
                        "aaaaaq": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaar": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaar"
                        },
                        "aaaaat": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaq"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "board_ids": [
                              "fafd80b7-f84a-4818-bf50-f5c3762967dc"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633214438,
                  "submission_result": "success/SUBMIT",
                  "ticks": 77
            }
      },
      "780fc9bd-794c-4906-9f64-c04d19144e0f": {
            "918cf39d-5098-4a23-95df-feac58cb7c34": {
                  "id": "918cf39d-5098-4a23-95df-feac58cb7c34",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_918cf39d-5098-4a23-95df-feac58cb7c34.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645402586
            },
            "2a0659af-d883-4d40-9aca-36f1c1eda6af": {
                  "id": "2a0659af-d883-4d40-9aca-36f1c1eda6af",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_2a0659af-d883-4d40-9aca-36f1c1eda6af.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "2a0659af-d883-4d40-9aca-36f1c1eda6af"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645402623,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "f64c6426-1f81-441a-9395-36e14d90c30c": {
                  "id": "f64c6426-1f81-441a-9395-36e14d90c30c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "7_f64c6426-1f81-441a-9395-36e14d90c30c.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "f64c6426-1f81-441a-9395-36e14d90c30c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645459388,
                  "submission_result": "success/TEST",
                  "ticks": 67
            },
            "81b339ea-bc9b-4d30-9d64-b60d0a7c5a70": {
                  "id": "81b339ea-bc9b-4d30-9d64-b60d0a7c5a70",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_81b339ea-bc9b-4d30-9d64-b60d0a7c5a70.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645501736
            },
            "487f1a8a-186d-4366-bfcf-44ff1fef81fe": {
                  "id": "487f1a8a-186d-4366-bfcf-44ff1fef81fe",
                  "type": "ADD_ELEMENT",
                  "screenshot": "12_487f1a8a-186d-4366-bfcf-44ff1fef81fe.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645503685
            },
            "162d5b6e-7f4c-4c88-b041-3580abc66ef6": {
                  "id": "162d5b6e-7f4c-4c88-b041-3580abc66ef6",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "13_162d5b6e-7f4c-4c88-b041-3580abc66ef6.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645505218
            },
            "eee38f7a-9a26-4368-9e8e-b2300155f4b9": {
                  "id": "eee38f7a-9a26-4368-9e8e-b2300155f4b9",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "14_eee38f7a-9a26-4368-9e8e-b2300155f4b9.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645505223
            },
            "39b237ee-74e9-4903-b28c-a425397c6789": {
                  "id": "39b237ee-74e9-4903-b28c-a425397c6789",
                  "type": "ADD_ELEMENT",
                  "screenshot": "15_39b237ee-74e9-4903-b28c-a425397c6789.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645507279
            },
            "7699bbcc-a17e-4c4f-9907-832a69a159e9": {
                  "id": "7699bbcc-a17e-4c4f-9907-832a69a159e9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "16_7699bbcc-a17e-4c4f-9907-832a69a159e9.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645510480
            },
            "7c112742-76a9-407b-b2f4-607ca63c0da4": {
                  "id": "7c112742-76a9-407b-b2f4-607ca63c0da4",
                  "type": "BEGIN_LINK",
                  "screenshot": "17_7c112742-76a9-407b-b2f4-607ca63c0da4.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645527757
            },
            "cde5349f-3b1b-4e9b-a699-cb306c952b58": {
                  "id": "cde5349f-3b1b-4e9b-a699-cb306c952b58",
                  "type": "BEGIN_LINK",
                  "screenshot": "19_cde5349f-3b1b-4e9b-a699-cb306c952b58.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645530366
            },
            "c0df33f4-bb05-4de1-b648-e94c29292d50": {
                  "id": "c0df33f4-bb05-4de1-b648-e94c29292d50",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "25_c0df33f4-bb05-4de1-b648-e94c29292d50.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c0df33f4-bb05-4de1-b648-e94c29292d50"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645541881,
                  "submission_result": "success/TEST",
                  "ticks": 73
            },
            "b8d554bd-4a6d-4806-a046-8b3288e45b08": {
                  "id": "b8d554bd-4a6d-4806-a046-8b3288e45b08",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "26_b8d554bd-4a6d-4806-a046-8b3288e45b08.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645597651
            },
            "7c1ab865-ea9c-493a-a28c-596eab63e0bc": {
                  "id": "7c1ab865-ea9c-493a-a28c-596eab63e0bc",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "31_7c1ab865-ea9c-493a-a28c-596eab63e0bc.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "7c1ab865-ea9c-493a-a28c-596eab63e0bc"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645600941,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "5cb88cc6-29f0-4a38-952d-335f6d84a14e": {
                  "id": "5cb88cc6-29f0-4a38-952d-335f6d84a14e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "36_5cb88cc6-29f0-4a38-952d-335f6d84a14e.png",
                  "absolute_board_state": {
                        "aaaaca": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaacb": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaacc": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaacb"
                        },
                        "aaaacd": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaca"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "5cb88cc6-29f0-4a38-952d-335f6d84a14e"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624645611112,
                  "submission_result": "success/SUBMIT",
                  "ticks": 77
            }
      },
      "ceb929b7-97d0-4d10-89f8-8206ce24e7a5": {
            "6f0eb28d-960b-4bcd-8dd2-996fcdf112e7": {
                  "id": "6f0eb28d-960b-4bcd-8dd2-996fcdf112e7",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_6f0eb28d-960b-4bcd-8dd2-996fcdf112e7.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643920240
            },
            "6dcee51c-835c-4a34-90d6-92a142f2ab0c": {
                  "id": "6dcee51c-835c-4a34-90d6-92a142f2ab0c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_6dcee51c-835c-4a34-90d6-92a142f2ab0c.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6dcee51c-835c-4a34-90d6-92a142f2ab0c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643920280,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "672514d2-b9f3-43b7-8bfe-437119814db2": {
                  "id": "672514d2-b9f3-43b7-8bfe-437119814db2",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_672514d2-b9f3-43b7-8bfe-437119814db2.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643937476
            },
            "e207a06a-b5f3-4ed1-bc39-7e71a0441413": {
                  "id": "e207a06a-b5f3-4ed1-bc39-7e71a0441413",
                  "type": "ADD_ELEMENT",
                  "screenshot": "4_e207a06a-b5f3-4ed1-bc39-7e71a0441413.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643939379
            },
            "0940fa6e-174d-47f1-9505-1fb596ebcbc7": {
                  "id": "0940fa6e-174d-47f1-9505-1fb596ebcbc7",
                  "type": "ADD_ELEMENT",
                  "screenshot": "5_0940fa6e-174d-47f1-9505-1fb596ebcbc7.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643942020
            },
            "a0754ff6-eb75-4e4e-9fed-aa0538515163": {
                  "id": "a0754ff6-eb75-4e4e-9fed-aa0538515163",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "6_a0754ff6-eb75-4e4e-9fed-aa0538515163.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643943264
            },
            "0f9e7228-b3b1-477b-867d-98eaa30663de": {
                  "id": "0f9e7228-b3b1-477b-867d-98eaa30663de",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "7_0f9e7228-b3b1-477b-867d-98eaa30663de.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643943269
            },
            "080d852f-d131-4a9f-aa00-743999965288": {
                  "id": "080d852f-d131-4a9f-aa00-743999965288",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_080d852f-d131-4a9f-aa00-743999965288.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643951760
            },
            "72764402-f5fa-4eb4-9358-78ad34a96cb0": {
                  "id": "72764402-f5fa-4eb4-9358-78ad34a96cb0",
                  "type": "BEGIN_LINK",
                  "screenshot": "9_72764402-f5fa-4eb4-9358-78ad34a96cb0.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643956740
            },
            "b7ff4f8a-26ba-47a3-afdb-c27bc6f87f23": {
                  "id": "b7ff4f8a-26ba-47a3-afdb-c27bc6f87f23",
                  "type": "ADD_ELEMENT",
                  "screenshot": "11_b7ff4f8a-26ba-47a3-afdb-c27bc6f87f23.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643966156
            },
            "4bff6643-04d9-41a0-a2af-3c90e1b64868": {
                  "id": "4bff6643-04d9-41a0-a2af-3c90e1b64868",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "12_4bff6643-04d9-41a0-a2af-3c90e1b64868.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643966634
            },
            "f8f3418e-c3bf-4611-ba76-490d443b7b95": {
                  "id": "f8f3418e-c3bf-4611-ba76-490d443b7b95",
                  "type": "BEGIN_LINK",
                  "screenshot": "13_f8f3418e-c3bf-4611-ba76-490d443b7b95.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "CE": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643967508
            },
            "c2edf697-3976-41ca-86a1-53d6026eab24": {
                  "id": "c2edf697-3976-41ca-86a1-53d6026eab24",
                  "type": "ADD_ELEMENT",
                  "screenshot": "15_c2edf697-3976-41ca-86a1-53d6026eab24.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 7,
                              "link": "aaaaan"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "CE": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643978432
            },
            "9a1dff26-c801-4e46-a006-4f0a2729bc09": {
                  "id": "9a1dff26-c801-4e46-a006-4f0a2729bc09",
                  "type": "BEGIN_LINK",
                  "screenshot": "16_9a1dff26-c801-4e46-a006-4f0a2729bc09.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 7,
                              "link": "aaaaan"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "CE": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643979453
            },
            "4c68015e-5197-4dc7-9d48-9174a4487703": {
                  "id": "4c68015e-5197-4dc7-9d48-9174a4487703",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "22_4c68015e-5197-4dc7-9d48-9174a4487703.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 7,
                              "link": "aaaaan"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "CE": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "4c68015e-5197-4dc7-9d48-9174a4487703"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643987298,
                  "submission_result": "success/TEST",
                  "ticks": 84
            },
            "90db9630-4a01-44a6-80fb-6048768c7dfa": {
                  "id": "90db9630-4a01-44a6-80fb-6048768c7dfa",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "27_90db9630-4a01-44a6-80fb-6048768c7dfa.png",
                  "absolute_board_state": {
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaan": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "active"
                        },
                        "aaaaao": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaap": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 5,
                              "link": "aaaaam"
                        },
                        "aaaaas": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 0,
                              "link": "aaaaao"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 4,
                              "element_y": 7,
                              "link": "aaaaan"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "C": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "CE": 1,
                              "FC": 1
                        },
                        "board_ids": [
                              "90db9630-4a01-44a6-80fb-6048768c7dfa"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624644039191,
                  "submission_result": "success/TEST",
                  "ticks": 84
            }
      },
      "e95dfdda-ad84-47c2-8d04-105692208369": {
            "787fe596-fea8-46fd-b2f1-8bcbff14dbf0": {
                  "id": "787fe596-fea8-46fd-b2f1-8bcbff14dbf0",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_787fe596-fea8-46fd-b2f1-8bcbff14dbf0.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643538623
            },
            "c9b1b4b5-77b1-40be-b264-6a5b10aa1168": {
                  "id": "c9b1b4b5-77b1-40be-b264-6a5b10aa1168",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_c9b1b4b5-77b1-40be-b264-6a5b10aa1168.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c9b1b4b5-77b1-40be-b264-6a5b10aa1168"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643538659,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "c9fc27bc-7ea3-4090-b508-dbf0aa4c89dd": {
                  "id": "c9fc27bc-7ea3-4090-b508-dbf0aa4c89dd",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_c9fc27bc-7ea3-4090-b508-dbf0aa4c89dd.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643550616
            },
            "3af25097-395e-4fa9-98bc-537e9e339755": {
                  "id": "3af25097-395e-4fa9-98bc-537e9e339755",
                  "type": "ADD_ELEMENT",
                  "screenshot": "4_3af25097-395e-4fa9-98bc-537e9e339755.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643552421
            },
            "66534268-a3af-458d-899d-e4a8640ce589": {
                  "id": "66534268-a3af-458d-899d-e4a8640ce589",
                  "type": "ADD_ELEMENT",
                  "screenshot": "7_66534268-a3af-458d-899d-e4a8640ce589.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643557355
            },
            "d4364d80-9fd1-4f11-a661-9a71e4cb93a2": {
                  "id": "d4364d80-9fd1-4f11-a661-9a71e4cb93a2",
                  "type": "ADD_ELEMENT",
                  "screenshot": "10_d4364d80-9fd1-4f11-a661-9a71e4cb93a2.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643559442
            },
            "24ba364b-54b9-4aa7-b730-bd10abd14b24": {
                  "id": "24ba364b-54b9-4aa7-b730-bd10abd14b24",
                  "type": "BEGIN_LINK",
                  "screenshot": "11_24ba364b-54b9-4aa7-b730-bd10abd14b24.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643565951
            },
            "aa63b9f6-390b-476c-aa74-3b46101a36f7": {
                  "id": "aa63b9f6-390b-476c-aa74-3b46101a36f7",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "13_aa63b9f6-390b-476c-aa74-3b46101a36f7.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643570404
            },
            "5c350fbc-ce73-4155-8310-69e5bf3b7037": {
                  "id": "5c350fbc-ce73-4155-8310-69e5bf3b7037",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "14_5c350fbc-ce73-4155-8310-69e5bf3b7037.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643570409
            },
            "681b4875-1c36-4370-815d-2bfd1d6f1dcf": {
                  "id": "681b4875-1c36-4370-815d-2bfd1d6f1dcf",
                  "type": "BEGIN_LINK",
                  "screenshot": "15_681b4875-1c36-4370-815d-2bfd1d6f1dcf.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643585213
            },
            "c5d7fc38-cba4-4f78-939b-c692c88fdee9": {
                  "id": "c5d7fc38-cba4-4f78-939b-c692c88fdee9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "17_c5d7fc38-cba4-4f78-939b-c692c88fdee9.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643595611
            },
            "34e65634-bed3-4e60-9b96-e38ca65b2138": {
                  "id": "34e65634-bed3-4e60-9b96-e38ca65b2138",
                  "type": "ADD_ELEMENT",
                  "screenshot": "20_34e65634-bed3-4e60-9b96-e38ca65b2138.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaba"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643598458
            },
            "14632959-1d0d-4d36-84a4-95ab7485c963": {
                  "id": "14632959-1d0d-4d36-84a4-95ab7485c963",
                  "type": "BEGIN_LINK",
                  "screenshot": "21_14632959-1d0d-4d36-84a4-95ab7485c963.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaba"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HE": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643599574
            },
            "fb5b57f8-b45a-48dd-bcd2-6620081ff987": {
                  "id": "fb5b57f8-b45a-48dd-bcd2-6620081ff987",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "27_fb5b57f8-b45a-48dd-bcd2-6620081ff987.png",
                  "absolute_board_state": {
                        "aaaaas": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaat": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaau": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 2,
                              "link": "aaaaat"
                        },
                        "aaaaav": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaas"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 4,
                              "link": "aaaaba"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "E": 1,
                              "D": 1,
                              "H": 1
                        },
                        "link_dict": {
                              "EC": 1,
                              "DA": 1,
                              "HE": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "fb5b57f8-b45a-48dd-bcd2-6620081ff987"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643606724,
                  "submission_result": "success/TEST",
                  "ticks": 81
            },
            "6733109a-89d7-4722-be16-f626ac615c51": {
                  "id": "6733109a-89d7-4722-be16-f626ac615c51",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "28_6733109a-89d7-4722-be16-f626ac615c51.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643752352
            },
            "4507a496-caba-4ec2-ae8d-007dfe992908": {
                  "id": "4507a496-caba-4ec2-ae8d-007dfe992908",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "29_4507a496-caba-4ec2-ae8d-007dfe992908.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "4507a496-caba-4ec2-ae8d-007dfe992908"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643752435,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "648538aa-fe07-43fb-8d15-d2137374a95f": {
                  "id": "648538aa-fe07-43fb-8d15-d2137374a95f",
                  "type": "ADD_ELEMENT",
                  "screenshot": "31_648538aa-fe07-43fb-8d15-d2137374a95f.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643769764
            },
            "96573d37-c64f-4040-89da-17803e39c43b": {
                  "id": "96573d37-c64f-4040-89da-17803e39c43b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "32_96573d37-c64f-4040-89da-17803e39c43b.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643771610
            },
            "10189db5-f350-4646-a847-15d4266e8e8b": {
                  "id": "10189db5-f350-4646-a847-15d4266e8e8b",
                  "type": "ADD_ELEMENT",
                  "screenshot": "33_10189db5-f350-4646-a847-15d4266e8e8b.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643773249
            },
            "502d5b8f-d92f-454a-9302-b4807c7a1d8d": {
                  "id": "502d5b8f-d92f-454a-9302-b4807c7a1d8d",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "34_502d5b8f-d92f-454a-9302-b4807c7a1d8d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643779670
            },
            "f51e32e3-403c-432b-91ad-7883ba5ad5ab": {
                  "id": "f51e32e3-403c-432b-91ad-7883ba5ad5ab",
                  "type": "ADD_ELEMENT",
                  "screenshot": "35_f51e32e3-403c-432b-91ad-7883ba5ad5ab.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643785421
            },
            "8c351ea4-bb55-4a65-a94f-879b5f3652a4": {
                  "id": "8c351ea4-bb55-4a65-a94f-879b5f3652a4",
                  "type": "ADD_ELEMENT",
                  "screenshot": "36_8c351ea4-bb55-4a65-a94f-879b5f3652a4.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643789730
            },
            "e6202ffd-bb89-4c99-accb-3941176640d9": {
                  "id": "e6202ffd-bb89-4c99-accb-3941176640d9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "37_e6202ffd-bb89-4c99-accb-3941176640d9.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643791911
            },
            "ff80793b-db3d-4a5f-81ba-e8f85fa0d48b": {
                  "id": "ff80793b-db3d-4a5f-81ba-e8f85fa0d48b",
                  "type": "BEGIN_LINK",
                  "screenshot": "38_ff80793b-db3d-4a5f-81ba-e8f85fa0d48b.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643796504
            },
            "527e1618-58c4-4a4d-b3cf-54c260f7252f": {
                  "id": "527e1618-58c4-4a4d-b3cf-54c260f7252f",
                  "type": "BEGIN_LINK",
                  "screenshot": "41_527e1618-58c4-4a4d-b3cf-54c260f7252f.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643802203
            },
            "d36a6464-2994-4944-b15a-6d2ab69762ff": {
                  "id": "d36a6464-2994-4944-b15a-6d2ab69762ff",
                  "type": "BEGIN_LINK",
                  "screenshot": "43_d36a6464-2994-4944-b15a-6d2ab69762ff.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "DA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643806119
            },
            "114f550e-eaf3-4f21-95d3-2286aeafe74d": {
                  "id": "114f550e-eaf3-4f21-95d3-2286aeafe74d",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "48_114f550e-eaf3-4f21-95d3-2286aeafe74d.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "DA": 1,
                              "FC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "114f550e-eaf3-4f21-95d3-2286aeafe74d"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643809375,
                  "submission_result": "failure/TEST",
                  "ticks": 8
            },
            "64671e3a-7706-4dab-bbd2-f45f68ed2b84": {
                  "id": "64671e3a-7706-4dab-bbd2-f45f68ed2b84",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "49_64671e3a-7706-4dab-bbd2-f45f68ed2b84.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "DA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643843279
            },
            "8c48d538-c6ee-4cf1-ac31-75e01b0bfaee": {
                  "id": "8c48d538-c6ee-4cf1-ac31-75e01b0bfaee",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "50_8c48d538-c6ee-4cf1-ac31-75e01b0bfaee.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "DA": 1,
                              "FC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643843286
            },
            "313ad2d2-65ff-4484-b975-831adbdd2982": {
                  "id": "313ad2d2-65ff-4484-b975-831adbdd2982",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "55_313ad2d2-65ff-4484-b975-831adbdd2982.png",
                  "absolute_board_state": {
                        "aaaaaa": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaab": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaac": {
                              "type": "semaphore",
                              "element_x": 4,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaad": {
                              "type": "signal",
                              "element_x": 3,
                              "element_y": 0,
                              "link": "aaaaac"
                        },
                        "aaaaae": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 5,
                              "link": "aaaaaa"
                        },
                        "aaaaaf": {
                              "type": "signal",
                              "element_x": 5,
                              "element_y": 6,
                              "link": "aaaaab"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 3,
                        "nSignals": 3,
                        "semaphore_zone_dict": {
                              "A": 1,
                              "C": 1,
                              "E": 1
                        },
                        "signal_zone_dict": {
                              "C": 1,
                              "D": 1,
                              "F": 1
                        },
                        "link_dict": {
                              "CE": 1,
                              "DA": 1,
                              "FC": 1
                        },
                        "board_ids": [
                              "313ad2d2-65ff-4484-b975-831adbdd2982"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624643867408,
                  "submission_result": "success/TEST",
                  "ticks": 217
            }
      },
      "9553b141-533e-4cd7-bb59-5d8f8c56a507": {
            "30822589-f21f-4338-8b89-3e602d2bdee8": {
                  "id": "30822589-f21f-4338-8b89-3e602d2bdee8",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_30822589-f21f-4338-8b89-3e602d2bdee8.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633367684
            },
            "ffb6595a-86e8-456e-a102-cd20c586accc": {
                  "id": "ffb6595a-86e8-456e-a102-cd20c586accc",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_ffb6595a-86e8-456e-a102-cd20c586accc.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "ffb6595a-86e8-456e-a102-cd20c586accc"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633367713,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "8da1015b-212e-4f0b-a893-9ac91f7b10e7": {
                  "id": "8da1015b-212e-4f0b-a893-9ac91f7b10e7",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "7_8da1015b-212e-4f0b-a893-9ac91f7b10e7.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "8da1015b-212e-4f0b-a893-9ac91f7b10e7"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633373131,
                  "submission_result": "success/TEST",
                  "ticks": 124
            },
            "5726d5aa-a460-4f60-b9f0-e5ad4889f671": {
                  "id": "5726d5aa-a460-4f60-b9f0-e5ad4889f671",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_5726d5aa-a460-4f60-b9f0-e5ad4889f671.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633435309
            },
            "637d3c3a-063b-427c-888b-ff5cf5597c3b": {
                  "id": "637d3c3a-063b-427c-888b-ff5cf5597c3b",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "9_637d3c3a-063b-427c-888b-ff5cf5597c3b.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633436092
            },
            "a9d26734-9780-46d9-af1d-f8a9d554e41d": {
                  "id": "a9d26734-9780-46d9-af1d-f8a9d554e41d",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "10_a9d26734-9780-46d9-af1d-f8a9d554e41d.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633436096
            },
            "344c24ab-ac89-4f4a-9b7b-c0cd423cdb91": {
                  "id": "344c24ab-ac89-4f4a-9b7b-c0cd423cdb91",
                  "type": "ADD_ELEMENT",
                  "screenshot": "12_344c24ab-ac89-4f4a-9b7b-c0cd423cdb91.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633439186
            },
            "4792747b-c8da-4497-9008-009f3d5a1cc9": {
                  "id": "4792747b-c8da-4497-9008-009f3d5a1cc9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "13_4792747b-c8da-4497-9008-009f3d5a1cc9.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633446790
            },
            "2c2131f6-c200-444e-8c37-46cdb5441785": {
                  "id": "2c2131f6-c200-444e-8c37-46cdb5441785",
                  "type": "ADD_ELEMENT",
                  "screenshot": "14_2c2131f6-c200-444e-8c37-46cdb5441785.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633450892
            },
            "a2f5c5fc-8389-46c2-9454-6af16d04fd07": {
                  "id": "a2f5c5fc-8389-46c2-9454-6af16d04fd07",
                  "type": "BEGIN_LINK",
                  "screenshot": "15_a2f5c5fc-8389-46c2-9454-6af16d04fd07.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633453182
            },
            "7174cd3f-eb98-40c5-8953-f9a941f4baa4": {
                  "id": "7174cd3f-eb98-40c5-8953-f9a941f4baa4",
                  "type": "BEGIN_LINK",
                  "screenshot": "17_7174cd3f-eb98-40c5-8953-f9a941f4baa4.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633457548
            },
            "6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192": {
                  "id": "6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "23_6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "6f6d8fac-2be0-47e4-b6a4-c2ecac2e9192"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633475640,
                  "submission_result": "success/TEST",
                  "ticks": 75
            },
            "bc2cc177-2b52-47d7-90e9-0a66a7248920": {
                  "id": "bc2cc177-2b52-47d7-90e9-0a66a7248920",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "24_bc2cc177-2b52-47d7-90e9-0a66a7248920.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633532568
            },
            "a7f27c56-7911-44e2-b2fd-5ff8f934c6d6": {
                  "id": "a7f27c56-7911-44e2-b2fd-5ff8f934c6d6",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "25_a7f27c56-7911-44e2-b2fd-5ff8f934c6d6.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633534611
            },
            "7583a156-7589-4c3b-bdad-0516cc26caea": {
                  "id": "7583a156-7589-4c3b-bdad-0516cc26caea",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "30_7583a156-7589-4c3b-bdad-0516cc26caea.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "7583a156-7589-4c3b-bdad-0516cc26caea"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633549504,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "48d32ffd-3087-4a96-9ec6-17ec49a16f1e": {
                  "id": "48d32ffd-3087-4a96-9ec6-17ec49a16f1e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "35_48d32ffd-3087-4a96-9ec6-17ec49a16f1e.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "E": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "EC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "48d32ffd-3087-4a96-9ec6-17ec49a16f1e"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633578234,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 243
            },
            "f206921b-289f-46ad-ac30-acb059f8ac00": {
                  "id": "f206921b-289f-46ad-ac30-acb059f8ac00",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "36_f206921b-289f-46ad-ac30-acb059f8ac00.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633664499
            },
            "019cff57-2e74-4a6e-ba32-4b3a5a99e691": {
                  "id": "019cff57-2e74-4a6e-ba32-4b3a5a99e691",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "37_019cff57-2e74-4a6e-ba32-4b3a5a99e691.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "D": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "DA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633665157
            },
            "c043e2e3-52f6-45af-b4ba-cca194ca99a8": {
                  "id": "c043e2e3-52f6-45af-b4ba-cca194ca99a8",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "38_c043e2e3-52f6-45af-b4ba-cca194ca99a8.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633667689
            },
            "f240de04-55de-43ff-9d4d-23bc48b5eb94": {
                  "id": "f240de04-55de-43ff-9d4d-23bc48b5eb94",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "43_f240de04-55de-43ff-9d4d-23bc48b5eb94.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "f240de04-55de-43ff-9d4d-23bc48b5eb94"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633704029,
                  "submission_result": "success/TEST",
                  "ticks": 75
            },
            "ae10d27d-25c3-42da-b455-82eca825cc4e": {
                  "id": "ae10d27d-25c3-42da-b455-82eca825cc4e",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "48_ae10d27d-25c3-42da-b455-82eca825cc4e.png",
                  "absolute_board_state": {
                        "aaaaay": {
                              "type": "semaphore",
                              "element_x": 3,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaz": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 0,
                              "link": "aaaaba"
                        },
                        "aaaaba": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 3,
                              "status": "inactive"
                        },
                        "aaaabb": {
                              "type": "signal",
                              "element_x": 1,
                              "element_y": 7,
                              "link": "aaaaay"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "G": 1,
                              "B": 1
                        },
                        "link_dict": {
                              "GA": 1,
                              "BC": 1
                        },
                        "board_ids": [
                              "ae10d27d-25c3-42da-b455-82eca825cc4e"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624633713711,
                  "submission_result": "success/SUBMIT",
                  "ticks": 75
            }
      },
      "c996d3cd-6f96-4b58-a4f4-60026db0edcc": {
            "17676930-9834-4e7d-9bbe-f68e2b4cf3dd": {
                  "id": "17676930-9834-4e7d-9bbe-f68e2b4cf3dd",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_17676930-9834-4e7d-9bbe-f68e2b4cf3dd.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622708315
            },
            "b7eccd85-f6be-4f46-9090-58c6eb9e5e5c": {
                  "id": "b7eccd85-f6be-4f46-9090-58c6eb9e5e5c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_b7eccd85-f6be-4f46-9090-58c6eb9e5e5c.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "b7eccd85-f6be-4f46-9090-58c6eb9e5e5c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622708351,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "ec312781-3c72-4d6f-bfab-9e19e5e5c1f5": {
                  "id": "ec312781-3c72-4d6f-bfab-9e19e5e5c1f5",
                  "type": "ADD_ELEMENT",
                  "screenshot": "3_ec312781-3c72-4d6f-bfab-9e19e5e5c1f5.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622712124
            },
            "3311f9cd-d684-405a-8e1a-bdd407c2a929": {
                  "id": "3311f9cd-d684-405a-8e1a-bdd407c2a929",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "6_3311f9cd-d684-405a-8e1a-bdd407c2a929.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622724164
            },
            "d7681f70-8f69-4f0b-901e-824061e7b108": {
                  "id": "d7681f70-8f69-4f0b-901e-824061e7b108",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "7_d7681f70-8f69-4f0b-901e-824061e7b108.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622724168
            },
            "146b6578-f93b-49cf-a94d-a06d8245c0df": {
                  "id": "146b6578-f93b-49cf-a94d-a06d8245c0df",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_146b6578-f93b-49cf-a94d-a06d8245c0df.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622726216
            },
            "05ce7890-a96f-4a4c-b680-61ebf28f69f9": {
                  "id": "05ce7890-a96f-4a4c-b680-61ebf28f69f9",
                  "type": "ADD_ELEMENT",
                  "screenshot": "9_05ce7890-a96f-4a4c-b680-61ebf28f69f9.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622734448
            },
            "8a3d958a-734c-4b23-ad3d-b0e4ab8e1dc1": {
                  "id": "8a3d958a-734c-4b23-ad3d-b0e4ab8e1dc1",
                  "type": "ADD_ELEMENT",
                  "screenshot": "12_8a3d958a-734c-4b23-ad3d-b0e4ab8e1dc1.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaj"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622738817
            },
            "9522729d-bec9-452f-a4ba-cb48492e6c6f": {
                  "id": "9522729d-bec9-452f-a4ba-cb48492e6c6f",
                  "type": "BEGIN_LINK",
                  "screenshot": "13_9522729d-bec9-452f-a4ba-cb48492e6c6f.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaj"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622744318
            },
            "df4ef611-920e-4754-b182-7a37722215f1": {
                  "id": "df4ef611-920e-4754-b182-7a37722215f1",
                  "type": "BEGIN_LINK",
                  "screenshot": "15_df4ef611-920e-4754-b182-7a37722215f1.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaj"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622746977
            },
            "1653f60d-aaef-485a-bbff-fd161d5def4c": {
                  "id": "1653f60d-aaef-485a-bbff-fd161d5def4c",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "21_1653f60d-aaef-485a-bbff-fd161d5def4c.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaj"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "1653f60d-aaef-485a-bbff-fd161d5def4c"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622760401,
                  "submission_result": "success/TEST",
                  "ticks": 76
            },
            "3d7d46a1-cc46-4a25-a41e-ac323d8fd07f": {
                  "id": "3d7d46a1-cc46-4a25-a41e-ac323d8fd07f",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "26_3d7d46a1-cc46-4a25-a41e-ac323d8fd07f.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 0,
                              "status": "active"
                        },
                        "aaaaaj": {
                              "type": "semaphore",
                              "element_x": 0,
                              "element_y": 2,
                              "status": "inactive"
                        },
                        "aaaaak": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaal": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaaj"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "board_ids": [
                              "3d7d46a1-cc46-4a25-a41e-ac323d8fd07f"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624622776319,
                  "submission_result": "success/SUBMIT",
                  "ticks": 76
            }
      },
      "5c2947cc-34b1-42ac-864c-3f69f9171c54": {
            "b78dc7c7-a8f1-4d48-aaa2-fbb406a8b44e": {
                  "id": "b78dc7c7-a8f1-4d48-aaa2-fbb406a8b44e",
                  "type": "BEGIN_LEVEL_LOAD",
                  "screenshot": "0_b78dc7c7-a8f1-4d48-aaa2-fbb406a8b44e.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632735656
            },
            "9c5ba07a-af2e-4c6f-b143-b2015b9033ea": {
                  "id": "9c5ba07a-af2e-4c6f-b143-b2015b9033ea",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "1_9c5ba07a-af2e-4c6f-b143-b2015b9033ea.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "9c5ba07a-af2e-4c6f-b143-b2015b9033ea"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632735697,
                  "submission_result": "Not a test/submit",
                  "ticks": "No Ticks Available"
            },
            "c5d349c1-0f51-4903-84f6-f70b4b018c89": {
                  "id": "c5d349c1-0f51-4903-84f6-f70b4b018c89",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "7_c5d349c1-0f51-4903-84f6-f70b4b018c89.png",
                  "absolute_board_state": {},
                  "abstracted_board_state": {
                        "nSemaphores": 0,
                        "nSignals": 0,
                        "semaphore_zone_dict": {},
                        "signal_zone_dict": {},
                        "link_dict": {},
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "c5d349c1-0f51-4903-84f6-f70b4b018c89"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632754877,
                  "submission_result": "failure/TEST",
                  "ticks": 175
            },
            "94648c67-400d-419d-a978-cd4e7931bca8": {
                  "id": "94648c67-400d-419d-a978-cd4e7931bca8",
                  "type": "ADD_ELEMENT",
                  "screenshot": "8_94648c67-400d-419d-a978-cd4e7931bca8.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 0,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {},
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632789934
            },
            "f8946ded-3f02-4603-85bc-3a8fbe870f59": {
                  "id": "f8946ded-3f02-4603-85bc-3a8fbe870f59",
                  "type": "ADD_ELEMENT",
                  "screenshot": "9_f8946ded-3f02-4603-85bc-3a8fbe870f59.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {}
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632793058
            },
            "e30fdf14-85d1-408b-8e94-b04c6290a948": {
                  "id": "e30fdf14-85d1-408b-8e94-b04c6290a948",
                  "type": "BEGIN_LINK",
                  "screenshot": "10_e30fdf14-85d1-408b-8e94-b04c6290a948.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632794845
            },
            "8760bda7-4f39-4fa6-8d4c-c071eb8cd752": {
                  "id": "8760bda7-4f39-4fa6-8d4c-c071eb8cd752",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "16_8760bda7-4f39-4fa6-8d4c-c071eb8cd752.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "8760bda7-4f39-4fa6-8d4c-c071eb8cd752"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632817072,
                  "submission_result": "success/TEST",
                  "ticks": 83
            },
            "bdb99255-3195-427b-a479-1e35e51182f3": {
                  "id": "bdb99255-3195-427b-a479-1e35e51182f3",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "21_bdb99255-3195-427b-a479-1e35e51182f3.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 1,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "bdb99255-3195-427b-a479-1e35e51182f3"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632847420,
                  "submission_result": "failure/SUBMIT",
                  "ticks": 189
            },
            "cc59be06-b986-442c-b7e5-a8d964c4dc8d": {
                  "id": "cc59be06-b986-442c-b7e5-a8d964c4dc8d",
                  "type": "ADD_ELEMENT",
                  "screenshot": "22_cc59be06-b986-442c-b7e5-a8d964c4dc8d.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 1,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632861979
            },
            "a34c82e0-b240-4d07-a69e-743a1ae73f8d": {
                  "id": "a34c82e0-b240-4d07-a69e-743a1ae73f8d",
                  "type": "ADD_ELEMENT",
                  "screenshot": "23_a34c82e0-b240-4d07-a69e-743a1ae73f8d.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632864570
            },
            "90fc2614-d916-4996-b502-b56509e0db49": {
                  "id": "90fc2614-d916-4996-b502-b56509e0db49",
                  "type": "BEGIN_LINK",
                  "screenshot": "24_90fc2614-d916-4996-b502-b56509e0db49.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632865939
            },
            "691c25dc-b2da-41ef-9835-9ff74c230224": {
                  "id": "691c25dc-b2da-41ef-9835-9ff74c230224",
                  "type": "MOVE_ELEMENT",
                  "screenshot": "26_691c25dc-b2da-41ef-9835-9ff74c230224.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632879836
            },
            "2ea9d245-0f65-4341-aa55-83d47faca3e0": {
                  "id": "2ea9d245-0f65-4341-aa55-83d47faca3e0",
                  "type": "TOGGLE_ELEMENT",
                  "screenshot": "27_2ea9d245-0f65-4341-aa55-83d47faca3e0.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        }
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632879843
            },
            "56c1b0fa-c47f-4f72-a4a3-3681fd7109d8": {
                  "id": "56c1b0fa-c47f-4f72-a4a3-3681fd7109d8",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "32_56c1b0fa-c47f-4f72-a4a3-3681fd7109d8.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "nextAction": "Recieved Next State",
                        "board_ids": [
                              "56c1b0fa-c47f-4f72-a4a3-3681fd7109d8"
                        ]
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632892182,
                  "submission_result": "success/TEST",
                  "ticks": 77
            },
            "5550e9b4-054a-4c45-9f14-1f9dd95cd1be": {
                  "id": "5550e9b4-054a-4c45-9f14-1f9dd95cd1be",
                  "type": "BOARD_SNAPSHOT",
                  "screenshot": "37_5550e9b4-054a-4c45-9f14-1f9dd95cd1be.png",
                  "absolute_board_state": {
                        "aaaaai": {
                              "type": "semaphore",
                              "element_x": 2,
                              "element_y": 1,
                              "status": "inactive"
                        },
                        "aaaaaj": {
                              "type": "signal",
                              "element_x": 2,
                              "element_y": 7,
                              "link": "aaaaai"
                        },
                        "aaaaam": {
                              "type": "semaphore",
                              "element_x": 1,
                              "element_y": 2,
                              "status": "active"
                        },
                        "aaaaan": {
                              "type": "signal",
                              "element_x": 7,
                              "element_y": 2,
                              "link": "aaaaam"
                        }
                  },
                  "abstracted_board_state": {
                        "nSemaphores": 2,
                        "nSignals": 2,
                        "semaphore_zone_dict": {
                              "C": 1,
                              "A": 1
                        },
                        "signal_zone_dict": {
                              "B": 1,
                              "G": 1
                        },
                        "link_dict": {
                              "BC": 1,
                              "GA": 1
                        },
                        "board_ids": [
                              "5550e9b4-054a-4c45-9f14-1f9dd95cd1be"
                        ],
                        "nextAction": "end game"
                  },
                  "discussion": [],
                  "upvotes": 0,
                  "created": 1624632935864,
                  "submission_result": "success/SUBMIT",
                  "ticks": 77
            }
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

/************************ Players comparison ************************/
player_ids=[] 
for (const [key, value] of Object.entries(player_traces)) {
    player_ids.push(key)}


let selector1 = d3.select("#player1");
       
    player_ids.forEach((sample) => {
        selector1
            .append("option")
            .text(sample)
            .property("value", sample);
    });

let selector2 = d3.select("#player2");
            
    player_ids.forEach((sample) => {
        selector2
            .append("option")
            .text(sample)
            .property("value", sample);
    });
$('#get_comparison').on('click', function () {
var player1_selected_id = $('#player1').find(":selected").text();
var player2_selected_id = $('#player2').find(":selected").text();
console.log(player1_selected_id)
console.log(player2_selected_id)

$('#player_comparison_info').empty();

if(player1_selected_id==player2_selected_id){
    d3.select("#player_comparison_info").append("p")
    .text("Oops you chose the same player!! Choose different players for proper comparison!")
}
else{
    // draw_comparison_chart(player1_selected_id,player2_selected_id)
    draw_comparison_chart1(player1_selected_id,player2_selected_id)
}
})
function emptyPlayerComparisonInfoDiv()
{
    $('#player_comparison_info').empty();
}
function draw_comparison_chart1(id1, id2)
{
    emptyPlayerComparisonInfoDiv()
    comparison_svg=d3.select("#player_comparison_info")
                .append("svg")
                .attr("width","250000px")
                .attr("height", "200px")
    var start_x_1=40
    var start_y_1=40
    var x_circle=40
    var y_circle=40
    var radius=15
    var line_length=9
    var distance_between_ids=radius*2+line_length*3

    // event ids 
    event_ids_player1=[]
    event_ids_player2=[]
    for (const [key, value] of Object.entries(player_traces[id1])) {
        event_ids_player1.push(key)
      }
    for (const [key, value] of Object.entries(player_traces[id2])) {
        event_ids_player2.push(key)
      }
    // get common [[(id,event_id),(id,event_id),(id,event_id)],[(id,event_id),(id,event_id)]]
    similar_ids_array=[]
    for(var i=0; i<event_ids_player1.length;i++)
    {
        similar=[]
        if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
        {
            
            nSemaphores=player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSemaphores']
            nSignals=player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSignals']
            sem_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['semaphore_zone_dict']))
            sig_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['signal_zone_dict']))
            link_dict=(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['link_dict']))

            for(var j=0; j<event_ids_player2.length;j++)
            {
                if(player_traces[id2][event_ids_player2[j]]['type']=='BOARD_SNAPSHOT')
                {
                if((nSemaphores==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSemaphores']) && (nSignals==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSignals']))
                {
                    if((sem_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(sig_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['signal_zone_dict']))&&(link_dict === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['link_dict'])))
                    {
                        similar.push((id2,player_traces[id2][event_ids_player2[j]]['id']))
                    }
                }
            }
            }
            for(var j=0; j<event_ids_player1.length;j++)
            {
                if(player_traces[id1][event_ids_player1[j]]['type']=='BOARD_SNAPSHOT')
                {
                if((nSemaphores==player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['nSemaphores']) && (nSignals==player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['nSignals']))
                {
                    if((sem_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(sig_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['signal_zone_dict']))&&(link_dict === JSON.stringify(player_traces[id1][event_ids_player1[j]]['abstracted_board_state']['link_dict'])))
                    {
                        similar.push((id1,player_traces[id1][event_ids_player1[j]]['id']))
                    }
                }
            }
            }
        }
        if(similar.length!=0)
        {
            
            similar_ids_array.push(similar)    
        }
        
    }
    let unique_ids_Array = Array.from(new Set(similar_ids_array.map(JSON.stringify)), JSON.parse);
    console.log(unique_ids_Array);
    // draw for player 1
    array_of_events_displayed=[]
    k=0
    for(var i=0;i<event_ids_player1.length;i++)
    {
        if(similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player1[i])))!=-1)
        {
            index=similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player1[i])))
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"common_state","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
            
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            for(var j=0;j<similar_ids_array[index].length;j++)
            {
                if(event_ids_player1.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player1","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
                }
                if(event_ids_player2.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player2","red",id1,event_ids_player2[i],comparison_svg,similar_ids_array[index].join())
                }
            }
            x_circle=x_circle+radius*2+line_length

        }
        else{
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"player_1","blue",id1,event_ids_player1[i],comparison_svg,event_ids_player1[i])
            x_circle=x_circle+radius*2+line_length
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            k=k+1
        }
    }
    // draw for player 2
    array_of_events_displayed=[]
    k=0
    x_circle=start_x_1
    y_circle=start_y_1+distance_between_ids
    for(var i=0;i<event_ids_player2.length;i++)
    {
        if(similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player2[i])))!=-1)
        {
            index=similar_ids_array.indexOf(similar_ids_array.find(arr => arr.includes(event_ids_player2[i])))
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"common_state","red",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index])
            
            array_of_events_displayed.push(event_ids_player2[i])
            array_of_events_displayed.push(k)
            for(var j=0;j<similar_ids_array[index].length;j++)
            {
                if(event_ids_player1.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player1","blue",id1,event_ids_player1[i],comparison_svg,similar_ids_array[index].join())
                }
                if(event_ids_player2.includes(similar_ids_array[index][j]))
                {
                    drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"loop_player2","red",id1,event_ids_player2[i],comparison_svg,similar_ids_array[index].join())
                }
            }
            x_circle=x_circle+radius*2+line_length

        }
        else{
            drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,"player_2","red",id1,event_ids_player1[i],comparison_svg,event_ids_player1[i])
            x_circle=x_circle+radius*2+line_length
            array_of_events_displayed.push(event_ids_player1[i])
            array_of_events_displayed.push(k)
            k=k+1
        }
    }
}
function drawBoard(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,event_type,line_color,id,event_id,svg,text)
{
    text=event_id
    var group=svg.append('g')
    if(event_type=="common_state")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#deed6d") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);
        group.append("title").text(text);
    }
    else if(event_type=="player_1")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#93ede9") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);

        group.append("title").text(text);
    }
    else if(event_type=="player_2")
    {
        
        group.append('circle')
             .attr('cx', x_circle)
             .attr('cy', y_circle)
             .attr('r', radius)
             .attr('stroke', 'black')
             .attr('fill', "#edaa93") 

       group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);

        group.append("title").text(text);
    }
    else if(event_type=="loop_player1")
    {
        // var arc = d3.arc()
        //     .innerRadius(40)
        //     .outerRadius(45)
        //     .startAngle(10)
        //     .endAngle(8);
  
        // group.append("path")
        //     .attr("class", "arc")
        //     .attr("d", arc)
        //     .attr("fill","blue");
        // path_coordinates="m "+ x_circle +" "+ y_circle+radius+" a -7 -53 0 0 0 -7 -1"
        // group.append("path")
        //      .attr("d",path_coordinates)
        
        group.append('line')
            .attr('x1', x_circle)
            .attr('y1', y_circle-radius)
            .attr('x2', x_circle)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "blue");
        group.append('line')
            .attr('x1', x_circle)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "blue");
        group.append('line')
            .attr('x1', x_circle-5)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5)
            .attr('y2', y_circle-radius)
            .attr('stroke', "blue");
    }
    
    else if(event_type=="loop_player2")
    {
        // var arc = d3.arc()
        //     .innerRadius(40)
        //     .outerRadius(45)
        //     .startAngle(10)
        //     .endAngle(8);
  
        // group.append("path")
        //     .attr("class", "arc")
        //     .attr("d", arc)
        //     .attr("fill","blue");
        // path_coordinates="m "+ x_circle +" "+ y_circle+radius+" a -7 -53 0 0 0 -7 -1"
        // group.append("path")
        //      .attr("d",path_coordinates)

        group.append('line')
            .attr('x1', x_circle+3)
            .attr('y1', y_circle-radius)
            .attr('x2', x_circle+3)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "red");
        group.append('line')
            .attr('x1', x_circle+3)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5+3)
            .attr('y2', y_circle-radius-10)
            .attr('stroke', "red");
        group.append('line')
            .attr('x1', x_circle-5+3)
            .attr('y1', y_circle-radius-10)
            .attr('x2', x_circle-5+3)
            .attr('y2', y_circle-radius)
            .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle+3)
        //     .attr('y1', y_circle-radius)
        //     .attr('x2', x_circle+3)
        //     .attr('y2', y_circle-radius-10)
        //     .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle+3)
        //     .attr('y1', y_circle-radius-10)
        //     .attr('x2', x_circle-5)
        //     .attr('y2', y_circle+radius-10)
        //     .attr('stroke', "red");
        // group.append('line')
        //     .attr('x1', x_circle-5)
        //     .attr('y1', y_circle+radius-10)
        //     .attr('x2', x_circle-5)
        //     .attr('y2', y_circle-radius)
        //     .attr('stroke', "red");
    }
}


function draw_comparison_chart(id1, id2)
{
    emptyPlayerComparisonInfoDiv()
    comparison_svg=d3.select("#player_comparison_info")
                .append("svg")
                .attr("width","250000px")
                .attr("height", "200px")
    var start_x_1=40
    var start_y_1=40
    var x_circle=40
    var y_circle=40
    var radius=15
    var line_length=9
    var distance_between_ids=radius*2+line_length*3



    
    // x_axis_circle+=2*radius_snapshot+line_length
    event_ids_player1=[]
    event_ids_player2=[]
    for (const [key, value] of Object.entries(player_traces[id1])) {
        event_ids_player1.push(key)
      }
    for (const [key, value] of Object.entries(player_traces[id2])) {
        event_ids_player2.push(key)
      }
    same_event_ids=[]  // the first id is player1 and second id is for player2
    // for getting the same event types in one array
    for(var i=0; i<event_ids_player1.length;i++)
    {
        if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
        {
            for(var j=0; j<event_ids_player2.length;j++)
            {
                if(player_traces[id1][event_ids_player1[i]]['type']=='BOARD_SNAPSHOT')
                {
                if((player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSemaphores']==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSemaphores']) && (player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['nSignals']==player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['nSignals']))
                {
                    if((JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['semaphore_zone_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['semaphore_zone_dict']))&&(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['signal_zone_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['signal_zone_dict']))&&(JSON.stringify(player_traces[id1][event_ids_player1[i]]['abstracted_board_state']['link_dict']) === JSON.stringify(player_traces[id2][event_ids_player2[j]]['abstracted_board_state']['link_dict'])))
                    {
                        same_event_ids.push(player_traces[id1][event_ids_player1[i]]['id'])
                        same_event_ids.push(player_traces[id2][event_ids_player2[j]]['id'])
                    }
                }
            }
            }
        }
    }
    console.log(same_event_ids)
    for(var i=0; i<event_ids_player1.length;i++)
    {
        draw_board(x_circle,y_circle,radius,line_length*2,start_x_1,start_y_1,"horizontal",'#99ccff',"blue",id1,event_ids_player1[i],comparison_svg)
        x_circle=x_circle+radius*2+line_length*2
    }
    x_circle=start_x_1 
    for(var i=0; i<event_ids_player2.length;i++)
    {
        if (same_event_ids.includes(event_ids_player2[i]))
        {
            
            draw_board(x_circle,y_circle+distance_between_ids,radius,line_length,start_x_1,start_y_1,"vertical",'#ff6666',"red",id2,event_ids_player2[i],comparison_svg)
            x_circle=x_circle+radius*2+line_length
        }
        else
        {
            draw_board(x_circle,y_circle+distance_between_ids,radius,line_length,start_x_1,start_y_1,"horizontal",'#ff6666',"red",id2,event_ids_player2[i],comparison_svg)
            x_circle=x_circle+radius*2+line_length
        }
        
    }
}

function draw_board(x_circle,y_circle,radius,line_length,start_x_1,start_y_1,line_type,fill,line_color,id,event_id,svg)
{
    text=event_id
    var group=svg.append('g')
         group.append('circle')
        .attr('cx', x_circle)
        .attr('cy', y_circle)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill', fill)
        if(line_type=="horizontal")
        {
            group.append('line')
            .attr('x1', x_circle+radius)
            .attr('y1', y_circle)
            .attr('x2', x_circle+radius+line_length)
            .attr('y2', y_circle)
            .attr('stroke', line_color);
        }
        if(line_type=="vertical")
        {
            similar_array=same_event_ids.map((val, index) => ({ val, index }))
   .filter(({val, index}) => val === event_id)
   .map(({val, index}) => index)
            
            for(var k=0;k<similar_array.length;k++)
            {
                console.log(start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[same_event_ids.indexOf(event_id)-1])*(2*radius+2*line_length))
                console.log(start_x_1)
                console.log(start_x_1-radius)
                // console.log(same_event_ids.indexOf(event_id)-1)
                console.log(same_event_ids[similar_array[k]-1])
                console.log(event_ids_player1.indexOf(same_event_ids[same_event_ids.indexOf(event_id)-1]))
                console.log("-----")
                group.append('line')
                .attr('x1', x_circle+radius)
                .attr('y1', y_circle)
                .attr('x2',start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('stroke', line_color);

                group.append('line')
                .attr('x2',start_x_1 + radius  + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('x1',start_x_1 - radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y1', start_y_1)
                .attr('stroke', line_color);

                group.append('line')
                .attr('x1', x_circle+2*radius)
                .attr('y1', y_circle)
                .attr('x2',start_x_1 + radius + event_ids_player1.indexOf(same_event_ids[similar_array[k]-1])*(2*radius+2*line_length))
                .attr('y2', start_y_1)
                .attr('stroke', line_color);
            }
            
        }
         
        group.append("title").text(text);
}
/********************* Intermediate analysis ***********************/ 


function emptyIntemediateDiv()
{
    $('#intermediate_action_analysis_svg').empty();
    $('#intermediate_action_analysis_1_svg').empty();
}

function drawEvent(x_axis_circle,y_axis_circle,radius,line_length,index,fill,text,svg_name,id,event_id,svg1)
{
    intermediate_gif_path=""
    $('.node_commenting').hide();
    var group=svg1.append('g')
         group.append('circle')
        .attr('cx', x_axis_circle)
        .attr('cy', y_axis_circle)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill', fill)
        group.append('line')
        .attr('x1', x_axis_circle+radius)
        .attr('y1', y_axis_circle)
        .attr('x2', x_axis_circle+radius+line_length)
        .attr('y2', y_axis_circle)
        .attr('stroke', 'red'); 
        group.append("title").text(text);
        if(player_traces[id][event_id]['type']=="BOARD_SNAPSHOT" && text!="intermediate gif")
        {
            if(player_traces[id][event_id]["ticks"]=="No Ticks Available")
            {
                group.append("text")
                    .attr({"x":x_axis_circle-3,"y": y_axis_circle+3})
                    .text("X")
                    .style("font-color","black")
            }
            else
            {
                group.append("text")
                    .attr({"x":x_axis_circle-3,"y": y_axis_circle+3})
                    .text(player_traces[id][event_id]["ticks"])
                    .style("font-color","black")
            }
            
        }
        
        if(svg_name!=="representation_2" && player_traces[id][event_id]['upvotes']>5)
        {
            group.append('circle')
        .attr('cx', x_axis_circle)
        .attr('cy', y_axis_circle+radius+radius/4+3)
        .attr('r', radius/4)
        .attr('stroke', 'black')
        .attr('fill', 'black')
        }
        group.on("click", function(){
            localStorage.setItem('event_id',event_id)
            localStorage.setItem('player_id',id)
            // edited
            if(svg_name=="representation_2")
            {
                if(text==="intermediate gif")
                {
                    console.log(index1)
                    $('#show_screenshot').empty();
                    for(var t=0;t<gif_mapper[id].length;t++)
                    {
                        console.log(((gif_mapper[id][t].split("/")[2]).split("_")[1]).split(".")[0])
                        console.log(player_traces[id][event_id]['screenshot'].split("_")[0])
                        if(((gif_mapper[id][t].split("/")[2]).split("_")[1]).split(".")[0]==player_traces[id][event_id]['screenshot'].split("_")[0])
                        {
                            console.log(gif_mapper[id][t])
                            intermediate_gif_path=gif_mapper[id][t];
                        }
                    }
                    d3.select('#show_screenshot')
                    .append("img")
                    .attr('src',intermediate_gif_path)
                    .style('height','300px')
                    .style('width','300px') 

                    


                    $('#event_type').text("Event type: "+text)
                    index1=player_traces[id][event_id]['screenshot'].split("_")[0]
                    console.log(index1)

                } 
                else if(player_traces[id][event_id]['type']=="BOARD_SNAPSHOT")
                {
                    $('#show_screenshot').empty();
                d3.select('#show_screenshot')
                .append("img")
                .attr('src',"IntermediateScreenShots/"+id+"/"+player_traces[id][event_id]['screenshot'])
                .style('height','300px')
                .style('width','300px') 

                $('#event_type').text("Event Type: "+player_traces[id][event_id]['type'])

                // edit here for displaying the better player amonf the given players
                player_ids=[] 
                $('#get_better_players').empty()
                ticks_count=player_traces[id][event_id]['ticks']
                flag1=0
                flag2=0
                for (const [key, value] of Object.entries(player_traces)) {
                    flag1=0
                    for(const[key1,value1] of Object.entries(player_traces[key]))
                    {
                        if(value1['type']=="BOARD_SNAPSHOT" && value1['submission_result']=='success/SUBMIT' && value1['ticks']!='No Ticks Available' && value1['ticks']<ticks_count){
                            // flag for displaying some text only once
                            if(flag2==0)
                            {
                                d3.select('#get_better_players')
                              .append('h2')
                              .text("Check out the following players who played better!!")
                              flag2=1
                            }
                            if(flag1==0)
                            {
                                d3.select('#get_better_players')
                              .append('p')
                              .text(key)
                              flag1=1
                            }
                            d3.select('#get_better_players')
                              .append("img")
                              .attr('src',"IntermediateScreenShots/"+key+"/"+value1['screenshot'])
                              .style('height','100px')
                              .style('width','100px')
                            d3.select('#get_better_players')
                              .append('p')
                              .text(value1['ticks']+" ticks")
                        }

                    }
                }
                }  
                
                // for(var i=0;i<player_ids.length;i++)
                // {
                //     for(var j=0;j<player_traces[player_ids[i]].length;j++)
                //     {
                //         console.log(player_traces[player_ids[i]][j])
                //     }
                // }
                $('#current_upvotes').text('Current Upvotes: '+player_traces[id][event_id]['upvotes'])
                  
            }
            else
            {
                $('#show_screenshot').empty();
                d3.select('#show_screenshot')
                .append("img")
                .attr('src',"IntermediateScreenShots/"+id+"/"+player_traces[id][event_id]['screenshot'])
                .style('height','300px')
                .style('width','300px')

                $('#event_type').text("Event Type: "+player_traces[id][event_id]['type'])
                $('#player_id').text("Player Id: "+id)
                $('#event_id').text("Event Id: "+event_id)
                
                $('#comment').val('');
                $('#previous_comments').empty();
                
                $('#current_upvotes').text('Current Upvotes: '+player_traces[id][event_id]['upvotes']) 
                for(var i=0;i<player_traces[id][event_id]['discussion'].length;i++)
                {   
                    $('#previous_comments').append('<p>'+ player_traces[id][event_id]['discussion'][i] +'</p>')
                }    
                 
            }
            $('.node_commenting').show();     
            $(".close_button").on("click",function(){
                $('.node_commenting').hide();
            }) 
            

              
        })
}

$('#submit_comment').click(function(){
    player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'].push($( "#comment" ).val())
    $('#comment').val('');  
    $('#previous_comments').empty();
    for(var i=0;i<player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'].length;i++)
    {   
        $('#previous_comments').append('<p>'+ player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['discussion'][i] +'</p>')
    }    
})


$('#submit_upvote').click(function(){
    player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes']+=1
    console.log(player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes'])
    $('#current_upvotes').empty()
    $('#current_upvotes').append('<p>'+'Current Upvotes: ' +player_traces[localStorage.getItem("player_id")][localStorage.getItem("event_id")]['upvotes'] +'</p>')
})

// function prev_state_board_snapshot(index,x_axis_circle,radius_snapshot,radius_other,previous_event_type,present_event_type)
// {
//     if(present_event_type!='BOARD_SNAPSHOT')
//     {
//         if(index!=0 && previous_event_type=="BOARD_SNAPSHOT")
//                 {
//                     console.log(x_axis_circle)
//                     console.log(x_axis_circle-radius_snapshot+radius_other)
//                     return (x_axis_circle-radius_snapshot+radius_other)
//                 }
//     }
//     else
//     {
//         if(index!=0 && (previous_event_type=="ADD_ELEMENT"||previous_event_type=="MOVE_ELEMENT"||previous_event_type=="REMOVE_ELEMENT"||previous_event_type=="TOGGLE_ELEMENT"||previous_event_type=="BEGIN_LINK"))
//         {
//             return(x_axis_circle-radius_other+radius_snapshot)
//         }
//     }
// }

function intermediate_state_representation(id){
emptyIntemediateDiv()
intermediate_svg=d3.select("#intermediate_action_analysis_svg")
                .append("svg")
                .attr("width","25000px")
                .attr("height", "100px")
// edited
intermediate_1_svg=d3.select("#intermediate_action_analysis_1_svg")
                .append("svg")
                .attr("width","25000px")
                .attr("height", "100px")

// edited
x_axis_circle_1=40
y_axis_circle_1=40
radius_snapshot_1=20
radius_other_1=10
line_length_1=25


x_axis_circle=40
y_axis_circle=40
radius_snapshot=20
radius_other=10
line_length=6

x_axis_circle+=2*radius_snapshot+line_length
event_ids=[]
for (const [key, value] of Object.entries(player_traces[id[0].slice(0,-5)])) {
    event_ids.push(key)
  }

//TODO : This loop needs to be optimized. Lot of repeted code!
for(var j=0; j<event_ids.length;j++)
{
      present_event_type=player_traces[id[0].slice(0,-5)][event_ids[j]]['type']
      if(j==0)
      {
        previous_event_type='none'    
      }
      else{
        previous_event_type=player_traces[id[0].slice(0,-5)][event_ids[j-1]]['type']
      }
      
      if (present_event_type=="ADD_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
            drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#3366cc',"add element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
            x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="MOVE_ELEMENT"){
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#dc3912',"move element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="TOGGLE_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
    //   x_axis_circle=prev_state_board_snapshot(j,x_axis_circle,radius_snapshot,radius_other, previous_event_type,present_event_type)
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#ff9900',"toggle element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="REMOVE_ELEMENT")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#109618', "remove element","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="BEGIN_LINK")
      {
        if(j!=0 && previous_event_type=="BOARD_SNAPSHOT")
        {
            x_axis_circle=(x_axis_circle-radius_snapshot+radius_other)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_other,line_length,index1,'#990099',"link added","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_other+line_length
      }
      if (present_event_type=="BOARD_SNAPSHOT")
      {
        if(j!=0 && (previous_event_type=="ADD_ELEMENT"||previous_event_type=="MOVE_ELEMENT"||previous_event_type=="REMOVE_ELEMENT"||previous_event_type=="TOGGLE_ELEMENT"||previous_event_type=="BEGIN_LINK"))
        {
            x_axis_circle=(x_axis_circle-radius_other+radius_snapshot)
        }
      drawEvent(x_axis_circle,y_axis_circle,radius_snapshot,line_length,index1,'#f5ffa3',"board snapshot","representation_1",id[0].slice(0,-5),event_ids[j],intermediate_svg)
      x_axis_circle+=2*radius_snapshot+line_length
    //   edited
    if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="Not a test/submit")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#e6cc27',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="success/TEST")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#a8fa87',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
        
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="success/SUBMIT")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#08850a',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="failure/TEST")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#e08080',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else if(player_traces[id[0].slice(0,-5)][event_ids[j]]['submission_result']=="failure/SUBMIT")
    {
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#a30505',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    else{
        drawEvent(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,'#62929c',"intermediate gif","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
        x_axis_circle_1+=2*radius_other_1+line_length_1
      drawEvent(x_axis_circle_1,y_axis_circle_1,radius_snapshot_1,line_length_1,index1,'#f5ffa3',"board snapshot","representation_2",id[0].slice(0,-5),event_ids[j],intermediate_1_svg)
      x_axis_circle_1+=radius_other_1+radius_snapshot_1+line_length_1
    }
    
      
      }

}
}

// function draw_mini_event(x_axis_circle_1,y_axis_circle_1,radius_other_1,line_length_1,index1,fill,id,event_ids,svg)
// {
    
// }
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
    var myGif=gif_mapper
    id = id[0].substring(0, id[0].length - 5);
    for (var i = 0; i < myImages[id].length; i++) 
    {
        image_path =  myImages[id][i].replace(/\/$/, '');
        gif_path =  myGif[id][i];
        $('#state_images').append("<img class='image-style'" + " src="+ gif_path +'>')
        $('#state_images').append("<img class='image-style'  style='border: 5px solid #0066ff;padding-left:0px; margin-left:51px;' " + " src="+ image_path +'>')
        
         
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
    google.charts.setOnLoadCallback(drawEventPieChart(id));
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

function drawEventPieChart(id) {
    var event_data = google.visualization.arrayToDataTable([
        ['Type', 'Percentage'],
        ['Add element',  playerEventStatisticsData[id]['ADD_ELEMENT']],
        ['Move element', playerEventStatisticsData[id]['MOVE_ELEMENT']],
        ['Toggle semaphore', playerEventStatisticsData[id]['TOGGLE_ELEMENT']],
        ['Remove element', playerEventStatisticsData[id]['REMOVE_ELEMENT']],
        ['Adding links', playerEventStatisticsData[id]['BEGIN_LINK']],
        ['Testing/Submiting', playerEventStatisticsData[id]['SET_REFLECTION_CONTENT']],
    ]);
    
    var options = {
        title: 'Event analysis'
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('event_pie'));
    
    chart.draw(event_data, options);
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
    intermediate_state_representation(d.user_ids)
    // displayLineChart(d.user_ids)
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
