CREATE TABLE signatures (
    gameid INT NOT NULL,
    amount TEXT NOT NULL,
    token TEXT NOT NULL,
    chainid INT NOT NULL,
    player TEXT NOT NULL,
    contract TEXT NOT NULL,
    v       INT NOT NULL,
    r       TEXT NOT NULL,
    s       TEXT NOT NULL
);

CREATE TABLE statistics(
    gameid  INT NOT NULL,
    player TEXT NOT NULL,
    token TEXT NOT NULL,
    contract TEXT NOT NULL,
    chainid INT NOT NULL,
    amount TEXT NOT NULL,
    kills  INT NOT NULL,
    deaths  INT NOT NULL,
    remainingRounds INT NOT NULL
);

CREATE TABLE leaderboard(
    player TEXT NOT NULL,
    games INT NOT NULL,
    wins INT NOT NULL,
    amountWon FLOAT NOT NULL,
    period INT NOT NULL,
    chainid INT NOT NULL,
    contract TEXT NOT NULL
);

CREATE TABLE utils(
    id INT NOT NULL,
    currentLeaderboardUpdate INT NOT NULL
);

INSERT INTO utils (id, currentleaderboardupdate) VALUES(0,0);

CREATE TABLE inventory(
    player TEXT NOT NULL,
    chainid INT NOT NULL,
    characterid INT,
    armor INT,
    weapon INT,
    boots INT
);

CREATE TABLE gamesproperties(
    gameid INT NOT NULL,
    chainid INT NOT NULL,
    map INT NOT NULL
);

CREATE TABLE armor_bonuses(
    id INT NOT NULL UNIQUE,
    health INT
);

CREATE TABLE boots_bonuses(
    id INT NOT NULL UNIQUE,
    speed INT,
    jump INT
);

CREATE TABLE weapon_bonuses(
    id INT NOT NULL UNIQUE,
    bullets INT,
    damage INT
);

CREATE TABLE players(
    player TEXT NOT NULL UNIQUE
);

INSERT INTO players(player) VALUES('0xf7c4bd295D9168879ff37431cd09Bdd470f75480');
INSERT INTO players(player) VALUES('0xd63dac78e1b3913779991a81cb1aa4eba74ca4fe');
INSERT INTO players(player) VALUES('0xae756b8946a2912d207f36e33a20fa02976ebb20');
INSERT INTO players(player) VALUES('0xfbf2dff529720b803007ff0b1e181160f5d17bda');
INSERT INTO players(player) VALUES('0x45d0d1a09509dc0c65ff9d4df0035fcea6a5ec62');
INSERT INTO players(player) VALUES('0x33ab855a59912a230cd812fd1cb796869b37fb72');
INSERT INTO players(player) VALUES('0x1a031637358876f3df9b394c79e3f9b4a9c96085');
INSERT INTO players(player) VALUES('0x025de75026d886c3265e039cfc7d681e11a49aaf');
INSERT INTO players(player) VALUES('0x14209c53039649e7e42279804fb14fa108bea962');
INSERT INTO players(player) VALUES('0xa1fb308038d1376fe53f3fab87d639f0d77e1dbb');
INSERT INTO players(player) VALUES('0x8faff9b78fec4d6d51dd020071a83a6098b12ab6');
INSERT INTO players(player) VALUES('0xb75e00e6d45dccfacf60376fabdf57845046ecf9');
INSERT INTO players(player) VALUES('0xfb2075f861d90248d2874d2446465605a7a85422');
insert into players(player) values('0xfb85e0d69e7a1cccbcec14e48c7505b4581cdada');
insert into players(player) values('0x2496de3990ce3b9b2f2dd8c1c146a2b2ffcb7d0b');
insert into players(player) values('0x4878f827a54b48b7869bbc27ea2d03a5abc3f4f9');
insert into players(player) values('0x9cce9428a597e9a52a555f47760f56ae0d7f8ef2');
insert into players(player) values('0x18b594a8fee1d7b657038c111c51b2bb18033002');
insert into players(player) values('0x77160b296084815d30b0e49069270ba17a33e7e7');
insert into players(player) values('0xf096102b8879469a95749807ce0ae1bed12beb9d');
insert into players(player) values('0x704880d88a45de1746361805cbf40039aa38e246');
insert into players(player) values('0x65b820f92003400b7a845286300f4660e4234214');
insert into players(player) values('0x28d1347bb5ae4dceeb2f77332b915f3b5af680f1');
insert into players(player) values('0x5e7d810946a4edde0bc757dec04836792106dc0c');
insert into players(player) values('0x4bf6b485a152c01332d346fcfb12d8989a3a32c1');
insert into players(player) values('0x9c85f122d962385aa36ab1607af317ef76a56456');
insert into players(player) values('0x5063b3af605285c4e7ef011a1cc5cb731f77cca9');
insert into players(player) values('0xef59c8427845bcad378fa28ad2cb11e2cca637a6');
insert into players(player) values('0x29251c216cc908e3936a35555e94d6b1524205a6');
insert into players(player) values('0x50269d383bf84a95697e39454dd94f3b6eca7140');
insert into players(player) values('0xc038ce7c08e0e2d0a8a06effcb8985275210e6d6');
insert into players(player) values('0x0e5abd7030b517c2ec01caabfc3a1e6e68394050');
insert into players(player) values('0x4a78b726cfde00269a80a8a23ab5c8a5763a0b26');
insert into players(player) values('0xaa3a92977559c334571181df1a7a77b4235c614f');
insert into players(player) values('0x4e3f2a59608dd6c4e8c8bc46a7e52901b646a802');
insert into players(player) values('0x5f5ce5db34a7e8444d2b529b3435d2246424f5f8');
insert into players(player) values('0xd313281516f95a368b362952d1da6abf0b97b983');
insert into players(player) values('0x00f735cf97077baaa31f8c14dbe30fe9aebbaea4');
insert into players(player) values('0x52673fa45a336e7d538cf45603f242e8dcc82a85');
insert into players(player) values('0xeddf25151232b110fa1d6b505713be0a2a138e0b');
insert into players(player) values('0x274e86003958103e450b5641335eb3266a776af1');
insert into players(player) values('0x701285effc97096f2bf5472e45656747add8a8f1');
insert into players(player) values('0x751b3a78a6edf5d718f17f96d79f9bb079298760');
insert into players(player) values('0x6668162fd22787c396fee016c0696a0da3b1e554');
insert into players(player) values('0x92c1a6016aa5d6edaa6315994dd07f3a3034b8b7');
insert into players(player) values('0x9c63be25e77dee6b3472717fcb8318eb09f8ea61');
insert into players(player) values('0x8d3f0d38412cf0e3001d86203969764a082697af');
insert into players(player) values('0x8cd671a03ca69be4be368094f6bd8a37e09748f9');
insert into players(player) values('0x0158a2338f2f09fe91df111c79202c7bb8018930');
insert into players(player) values('0xccddffedef80b037bffdaeb0c8002372a482d5e2');
insert into players(player) values('0x21e5f0b40096b4145ac9255a2cfb876bc0e80469');
insert into players(player) values('0xf4e30384b543ccf9dddd870f086c0c17229ab216');
insert into players(player) values('0x28295c3d24d3d972d45013d86a58d690f96a192f');
insert into players(player) values('0x2c8272f7e520679340157e079e0f296aec3033b3');
insert into players(player) values('0x30cd63bab564eb5189223bd866afac174d40ba01');
insert into players(player) values('0xc94688235cddc2c2eb328e7f61d016e75ef43bf5');
insert into players(player) values('0x264ac44e857280b98091233f82066ace8d5580bb');
insert into players(player) values('0xa00c1ececa25284822f2aa984387f6debda39628');
insert into players(player) values('0xda721b1966c7cd2bce71a4eec95ac41b4531a52d');
insert into players(player) values('0x8947b9b5dbb733dc6b6f527a7b04250a2247097e');
insert into players(player) values('0x1194162504aaa1971e41685d82e155cf8681dad0');
insert into players(player) values('0x111e355eb9533e1efb79e9b275257b51a80b0a71');
insert into players(player) values('0xef8f5124d2e50fb3dc6481361a6da6110564e072');
insert into players(player) values('0xc532f47939385ac9da16de085bdb79838938b6b4');
insert into players(player) values('0xe24cad15e34ef046510832fa98707e04193106c8');
insert into players(player) values('0x30bdbc72308311d8c0102d9d0a3f9e12664acd24');
insert into players(player) values('0x4ff1f246ceaf366dfcfd1fdd5163470fc79dc8ad');
insert into players(player) values('0x93bf4aa2a8aa3d7cb2e72dc42dd4cfd532695515');
insert into players(player) values('0xaa82256f672a6f007d79e1505860117a4b9c596a');
insert into players(player) values('0x8e704c8a3e3641d7c037aceddc925107a2dc6138');
insert into players(player) values('0x3b9f45458fd9edb2f503c837a2bc5c87d976eef1');
insert into players(player) values('0xeff5a9a29ef9a83f155837a724f3264d812cd1b0');
insert into players(player) values('0xcbf8184dba6058ea0444a54bdc7cbebbfe81ac0e');
insert into players(player) values('0x4bff4fbb1f8ef9dd0871af671537f693430fee7e');
insert into players(player) values('0x04c782076a0af9610a2fa3d742db5dd52e052dd9');
insert into players(player) values('0x3e2de4c75fd3f0085e32020ffa554e8902a2cfdc');
insert into players(player) values('0x4f43be769a8f2c05a8563abe18a9313136e0807e');
insert into players(player) values('0x857f88e0347fbc1c9f03e6ea458bad8c09cd8a54');
insert into players(player) values('0xb74FEBf1677b77Addc29497087222D1F7420b3F7');
insert into players(player) values('0xB168C9069fed11E177ca6b94e1D7d663b65922da');
insert into players(player) values('0xE1c2D81Ac574BBa7A03e997bf9b8e3Ffa342D80c');
insert into players(player) values('0x5490E47A4E50309a1EE03A12Bf5Bb862e028CDe4');
insert into players(player) values('0x67d347884719B38AC1f3F7eBa692Aa198EF8F24d');
insert into players(player) values('0x439e78fDA08C1260811289cFA5Ab09b7933F5A3f');
insert into players(player) values('0xC8c75713776Bd20FA59ED9b03b1d30b3b8D24311');
insert into players(player) values('0x62dEf8EA2C680eCF937cc4Cb391bBD266A8405cb');
insert into players(player) values('0xc109241b3EefD459445011F674De410FbBe89681');
insert into players(player) values('0xBDd1459d95F9E0D4C9Ef91Cb7eb2b8A0a35C78a2');
insert into players(player) values('0x59fe4f301d69462ab914883c12a7b946d8ecced3');
insert into players(player) values('0x18a77f5f216a5637358027e00c3153e196f17ca8');
insert into players(player) values('0x6e20babe71ff35b9868d0f0dc97225d920d90d68');
insert into players(player) values('0xfbb165d7ac6f27c40d21564261ed416a3b246bbc');
insert into players(player) values('0x43dc3c06842bad370ec66c9a8f74a2e0da466edc');
insert into players(player) values('0x7d37f8f72838d2e82d7e46850e2b57734840edb8');
insert into players(player) values('0x81bdf0ec8bca3bb0268bd1f82d04e8ac1293943a');
insert into players(player) values('0x6f039285f86a4b7bdad82c2243de6d08912ceefb');
insert into players(player) values('0xafc3be1aa0b860653afa4b61f0c2a0c015fce5c3');
insert into players(player) values('0x52efab9b9bc406878b0b8db50985b41749d0f324');
insert into players(player) values('0x926574fa572c8e647880649266d26ef5131f5a10');
insert into players(player) values('0x5bed7d78b2a79949b8ccba31b038edc40b60fbd9');
insert into players(player) values('0x1fa65353b40c1cb027ad6a8d18885ed737e19add');
insert into players(player) values('0x4329a52c9e0ad7e99208eaa2329e092d750c4af7');
insert into players(player) values('0xdbbd07e5877e9a4327d2e43ebb8411c91afbb575');
insert into players(player) values('0x87bfe4eb097169014bbf03b0b4b29b4c3242437a');
insert into players(player) values('0xbc46036d104ab873594f627b5c0b82a6569e331d');
insert into players(player) values('0x675b737516b040300465eda0347578bcd025e58c');
insert into players(player) values('0xf2fd50f832855675487c439330eb61c4ed74f826');
insert into players(player) values('0xc46c9fd4bd06aab51f7fcf5388401a3b96101e61');
insert into players(player) values('0xfa32eb84dc1843da6f460c5f3fd4a1e6e62a3304');
insert into players(player) values('0xa9041b18b8599a5b26c7f0d911b8825b76d7c720');
insert into players(player) values('0xdaa0d194aca2e8249e7794d48117834c15a502d6');
insert into players(player) values('0x60be1045677dc43f62b62dd176b4a10aec308070');
insert into players(player) values('0xe24e53e8a51f7f250f485b3d7804d0a12ce65368');
insert into players(player) values('0x48bbf752fe830541ec8235a2c9b219de22ed0de3');
insert into players(player) values('0x09fad1f0e8b31ecc1109322a060336a887e31a80');
insert into players(player) values('0xa911df08a7f868d3b0b865d825960705c4732c7a');
insert into players(player) values('0xe64923d1205408752271a0fa6828001e391a7b5e');
insert into players(player) values('0x817979d014264a7a99562ddbb88e0765b8eb657b');
insert into players(player) values('0x96cc40d4401b22abc3b80a315a12505a5d156b0a');
insert into players(player) values('0x73c46dc9f39b11a861400edd35c0a8f45f3134cb');
insert into players(player) values('0x3cc40343ea58ceaa3a47d8abd5863618fdbf0c03');
insert into players(player) values('0x4a5B2e467fa3ecCEa5d9c48b58277e9E6DdAf981');
insert into players(player) values('0xa9404C6dA65cb011eE4e7c43C3e97A1Bbe841517');
insert into players(player) values('0xf3725E397567657118E3fD820657d935bB680142');
insert into players(player) values('0x7f52eA814433D3c412E0ba7c1B5E2D61188948dB');
insert into players(player) values('0xE643c554ebc846f98c5f03AC121e1bbdf9b513a9');
insert into players(player) values('0xEEB67026562B96CC91ba629e02d7f62B4A19E118');
insert into players(player) values('0x8EA87108767b38aC14B05051D5526e5403e2F279');
insert into players(player) values('0x7579794F386795bEB3fd01B926B684fb57b0f2B7');
insert into players(player) values('0xa0D7B69bbF4B56558daA61EB96e2bBeb980C2d2B');
insert into players(player) values('0xe5b714f7691517ee832069313aAAeFA5D05Bc104');
insert into players(player) values('0x6FC597810DeDc6E044400D6d73165E9Dbc6407C8');
insert into players(player) values('0xb7ef06af5150EF5FB42A2fDfA0b292393895E15f');
insert into players(player) values('0xe53b0e45d84d6eebfe54b4a2adf6c136486d6ae1');
insert into players(player) values('0xe60d82f626d2bb4484c9022843d3f7143a6a1971');
insert into players(player) values('0x746c024af07886be160e6c00a2e95f9453ee716f');
insert into players(player) values('0xcc27650cbb8a8fb3ecbe7302873b52ad21dddd65');
insert into players(player) values('0x7f9116f43183694a29555881265b2e6019159a6b');
insert into players(player) values('0x9f40871c89cf43530481ea8f1cc29157cf2a1464');
insert into players(player) values('0x1f2adf6ef169f960b575dc83dba5af53338d85c0');
insert into players(player) values('0x72a5a9f7a578a0a2b0bba280440cbddf14413db1');
insert into players(player) values('0xc160e052ae2b7b6098d77ee0b36593bdfcd46f71');
insert into players(player) values('0x842013360b0bfc78ec5d5fc1907be5c772c95ea2');

INSERT INTO armor_bonuses(id, health) VALUES(0, 1);
INSERT INTO armor_bonuses(id, health) VALUES(1, 3);
INSERT INTO armor_bonuses(id, health) VALUES(2, 3);
INSERT INTO armor_bonuses(id, health) VALUES(3, 4);
INSERT INTO armor_bonuses(id, health) VALUES(4, 4);
INSERT INTO armor_bonuses(id, health) VALUES(5, 5);
INSERT INTO armor_bonuses(id, health) VALUES(6, 7);
INSERT INTO armor_bonuses(id, health) VALUES(7, 9);

INSERT INTO boots_bonuses(id, speed, jump) VALUES(0, 180, 25);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(1, 360, 50);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(2, 460, 75);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(3, 420, 110);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(4, 500, 180);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(5, 750, 80);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(6, 1000, 130);
INSERT INTO boots_bonuses(id, speed, jump) VALUES(7, 777, 222);

INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(0, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(1, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(2, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(3, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(4, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(5, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(6, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(7, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(8, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(9, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(10, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(11, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(12, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(13, 9, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(14, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(15, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(16, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(17, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(18, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(19, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(20, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(21, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(22, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(23, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(24, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(25, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(26, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(27, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(28, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(29, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(30, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(31, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(32, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(33, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(34, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(35, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(36, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(37, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(38, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(39, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(40, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(41, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(42, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(43, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(44, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(45, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(46, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(47, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(48, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(49, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(50, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(51, 9, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(52, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(53, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(54, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(55, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(56, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(57, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(58, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(59, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(60, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(61, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(62, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(63, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(64, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(65, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(66, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(67, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(68, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(69, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(70, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(71, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(72, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(73, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(74, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(75, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(76, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(77, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(78, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(79, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(80, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(81, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(82, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(83, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(84, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(85, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(86, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(87, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(88, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(89, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(90, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(91, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(92, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(93, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(94, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(95, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(96, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(97, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(98, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(99, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(100, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(101, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(102, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(103, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(104, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(105, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(106, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(107, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(108, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(109, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(110, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(111, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(112, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(113, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(114, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(115, 6, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(116, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(117, 2, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(118, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(119, 1, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(120, 9, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(121, 9, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(122, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(123, 8, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(124, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(125, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(126, 7, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(127, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(128, 4, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(129, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(130, 3, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(131, 5, 0);
INSERT INTO weapon_bonuses(id, bullets, damage) VALUES(132, 9, 0);

CREATE TABLE lootbox_conditions (
    id              SERIAL PRIMARY KEY,
    description     TEXT
);

CREATE TABLE lootbox_signatures (
    player          TEXT NOT NULL,
    chainid         INT NOT NULL,
    condition_id    INT REFERENCES lootbox_conditions(id),
    random_number   INT NOT NULL,
    v               INT NOT NULL,
    r               TEXT NOT NULL,
    s               TEXT NOT NULL
);

INSERT INTO lootbox_conditions (description) VALUES('5 games played');
INSERT INTO lootbox_conditions (description) VALUES('Won 5 games in a row');
INSERT INTO lootbox_conditions (description) VALUES('100 kills');