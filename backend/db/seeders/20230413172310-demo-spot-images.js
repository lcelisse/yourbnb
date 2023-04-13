"use strict";
const { Op } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://cdn.inprnt.com/thumbs/19/3b/193b9d264e6ccd65cdb0543604eaaf2d.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.redd.it/wxsok42ou2g61.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.pinimg.com/originals/f7/b9/ea/f7b9ea239630e0f14cc17e51dbeca0ac.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-13761529/original/329b4608-26d0-4492-ab99-331fd4d6c00c.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-13761529/original/0396cfe1-6627-4d85-89f4-4804d4f7a7d4.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/2ad32f65-5c21-4a51-a02a-d2aa6da773b8.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-43820210/original/5389a84b-980c-40e9-af59-00faf49a74eb.jpeg?im_w=720",
          preview: true,
        },

        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/ab5e9bcc-a7bf-48c7-8283-447a96d03d91.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/9a4f3629-4c40-42df-8720-2671e3d4ebe4.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/e585a6d6-c4f3-47d4-91cc-5578d2a5227f.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/8cf45f0a-7fa3-4fca-b530-6f959e03ae3d.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/4b085f5f-0bd8-4782-90e7-9922d55c3ee7.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/95aa4572-10f7-426c-88b0-0eaf74150759.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/9a98d898-b2d2-44d1-b3b4-95cb0730689a.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/629dbec2-bdb8-48ff-afb0-518eec0f8fa0.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/0250953e-6890-44a3-916a-2339b6c1d362.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/37e688ac-2614-4588-b501-1c5752c29f69.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/6d82536e-6350-4d74-b672-1bcb0bccb1c6.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/97646b8a-1eea-4a9c-9563-3bf435861682.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/1581b56b-edea-4724-bbc5-c18134a5e6fb.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/5d73dab0-cd51-4231-ba0b-24d3126c007f.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/71ecfc88-aa1b-475e-a190-43a036d8c978.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/2042aea7-8d43-4f9c-b244-65dfbd313cde.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/76ab52c7-5fcc-43cf-a220-a3fbbf0153ee.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/1cd1f78d-8b72-41a0-8c55-f5ec470c0a1a.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/e5563e70-3c58-4480-be9e-c9d500c2005e.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/935a2d2d-ab96-4616-827d-c8fb28c31421.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-22863263/original/f295631e-79db-404e-aa09-82b365c7d455.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-22863263/original/4661a011-5cb9-4159-ad42-95f6c38cb086.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-22863263/original/a62797ba-4d39-4693-b98f-b49272e6ceea.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-22863263/original/142017c3-435a-451e-8ef4-29e7dd77d66b.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-22863263/original/601cbb01-aa68-4b68-8773-1586fa0949ef.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/240bc2fe-7967-41fd-8554-1858b0e1f827.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/d12b5353-4fc4-4924-84ea-4f4e371ce127.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/39f3734b-3cb6-4bef-a0c5-50314f684854.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/a1c995f8-2532-43e7-8c53-d5ff13899b72.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-44017321/original/563f55b6-00a3-4850-a291-c50bdd8d6563.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53594153/original/27973141-17db-4ee6-9373-589e495230f4.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53594153/original/33c9bd2b-66af-4377-96af-f49ad5ad7019.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53594153/original/4d468552-8fdf-4641-984d-cb3207af075a.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53594153/original/bcdfd92b-aa1d-427f-8400-5e2590cc7ad0.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53594153/original/4c62656b-ccb9-4503-b5eb-c990a1575b11.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-569410902293807790/original/979341ef-a0de-407b-8075-83e94d528b2f.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-569410902293807790/original/bab09248-b8e2-42e0-8eb2-7d98c1783b4b.png?im_w=720",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-569410902293807790/original/ea976859-0f44-49bf-926c-bc9efbc9d5fe.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-569410902293807790/original/db8fd435-dc95-42c1-a779-adb11e6d1ba4.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 10,
          url: "hhttps://a0.muscache.com/im/pictures/miso/Hosting-569410902293807790/original/fbf3cea3-ecdc-4719-8adf-5067c78d536e.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/edc9e474-fc2f-423f-821d-5328686723e2.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/07167c2d-2780-4617-9da7-9c05a38b563b.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/403703c8-e91d-466e-ab98-82c3496c2436.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/8939e396-3417-4670-8291-8045d753f855.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/fedf7159-58d3-45da-9217-69c8933e14dd.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/f94a95de-dc38-4b12-a3d1-8026f1068a38.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/be2cad34-cebc-4bd7-b7ad-9b6ef05c5377.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/dbd17bea-f502-49cd-8c85-55e04f25f7a5.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/af8ea2b6-d55e-4c95-817f-640b593c05f2.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/e6a16c1a-2cdc-4e40-b35a-6ee0f37fe20e.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/206d375f-39ea-4fb3-8ea3-caf4f880bda2.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/70274a15-729c-484d-9d54-56a531e6a471.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-42962645/original/fb533969-000c-411a-80f9-1ebb7eddf702.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/45d622f5-f2b5-4fad-a522-5f89009386fe.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-42962645/original/d43572a0-bf27-4811-88b7-0b387c1ff51f.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-633854497590931434/original/6470010c-f123-43a8-9fca-51ce663a296e.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-633854497590931434/original/d0f7f4d4-4832-49b0-b646-f8aa527fad43.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 14,
          url: "hhttps://a0.muscache.com/im/pictures/miso/Hosting-633854497590931434/original/6fa49d50-b50e-416d-8268-e765ebba68d2.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-633854497590931434/original/3c8da797-cdb6-4fce-b626-71cc5916d198.png?im_w=720",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/5f629d84-ad18-45b5-82ee-a9ba756d1b3f.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/5fa95bf1-6605-477c-87b3-3a148aef7b3b.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46708849/original/6f4b24d1-f80c-41fa-9db1-7fec894b8059.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/878b1fe6-0e98-4aff-bee4-8fabc2978804.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/f3ddcb2d-3ae0-436c-b0d1-2f8b95fb2dee.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/673deb03-f7b2-4838-956c-3ea44fceb0d2.jpg?im_w=720",
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] },
    });
  },
};
