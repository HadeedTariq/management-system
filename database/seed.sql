--
-- PostgreSQL database dump
--

\restrict hn5ZnMfWR0QaavRJy30BuXrTp99d0nhCasyQVRjp3ikyQDcPN3y8X7ou7m4fkA3

-- Dumped from database version 17.6 (Debian 17.6-2.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-2.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: your_user_name
--

INSERT INTO drizzle.__drizzle_migrations VALUES (1, '23bd1f6916a5ef0c3b4c6cd74cd3f22f45ae196c7b3dc6a8f1a6cf6e3bf8ad05', 1765813921852);
INSERT INTO drizzle.__drizzle_migrations VALUES (2, '5a3e95b23e465396740600f8fa29575166a534bfff926d6dfbedb80714cc94ae', 1765814464857);
INSERT INTO drizzle.__drizzle_migrations VALUES (3, 'c63b15124d7d44dddf059e442df2fd28afac3989a080984feb4777365a7a8e2a', 1765815064390);
INSERT INTO drizzle.__drizzle_migrations VALUES (4, '4d2075089d00916801467ffcd43cdaa72abc1929ba4d935d88f7a53f206ec8b9', 1765900742315);
INSERT INTO drizzle.__drizzle_migrations VALUES (5, 'de45930ce0d4cc58b3832eb868036ce6db7c46a9f689f6f2ef418bb1f6a08da2', 1765977362833);
INSERT INTO drizzle.__drizzle_migrations VALUES (6, '98ac941540a951c191c0733d3ac338e094181c368d9ec8f483a0a485eaf85cf8', 1776748785980);
INSERT INTO drizzle.__drizzle_migrations VALUES (7, '6a97db5a611ad31ef6b6f1237fba24f3b0588423aff092c4f7f889575400f0ac', 1776843844798);
INSERT INTO drizzle.__drizzle_migrations VALUES (8, '19732119bcbb5d2165476b21f4b2f3db8fd98b4b56d46f4b8efeade84541d226', 1776851459000);
INSERT INTO drizzle.__drizzle_migrations VALUES (9, 'c0f1e22d48d1b7122f6f0ecc67003414081e11703253b3a9ec220f89e5f4e533', 1777379987967);
INSERT INTO drizzle.__drizzle_migrations VALUES (10, 'd24a5e45cd7f2c95664a25eb69dc8c5fe9c68d19a07928bbb563b5adf1c72dd9', 1777793902027);
INSERT INTO drizzle.__drizzle_migrations VALUES (11, '74c755b95d8cd7fa45034383798f3db719cbeae735ed3dea2639fe3963757d1f', 1779086043897);


--
-- Data for Name: email_otps; Type: TABLE DATA; Schema: public; Owner: your_user_name
--

INSERT INTO public.email_otps VALUES ('8a4a9e1e-cb6e-4411-b670-d9fd87a181dc', 'hadeedtariq12@gmail.com', '742230', '2026-09-14 05:30:51.411+00', '2026-09-14 05:25:58.661595+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: your_user_name
--

INSERT INTO public.users VALUES ('19177d7f-5ee9-43fc-a343-c8c970618d84', 'Muhammad Ali', 'muhammad.ali@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('4b05be44-cb17-4f63-b20f-a67636bee19a', 'Ahmed Khan', 'ahmed.khan@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('3e6f6041-2277-4f18-ae4c-df227416d245', 'Usman Tariq', 'usman.tariq@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'teacher', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'Hamza Malik', 'hamza.malik@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'facebook', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'Bilal Chaudhry', 'bilal.chaudhry@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'whatsapp', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'Zaid Hassan', 'zaid.hassan@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'admin', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('b1810386-398e-4e8a-9f7b-d48e924ef588', 'Omer Farooq', 'omer.farooq@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('64d07f7e-1bcd-470a-80a6-6a629acde845', 'Shahzaib Raza', 'shahzaib.raza@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('33660b32-3e22-4b11-88b4-6a181ab7fe33', 'Danyal Ahmed', 'danyal.ahmed@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'teacher', 'whatsapp', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'Fahad Mustafa', 'fahad.mustafa@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'facebook', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('a7a053b8-5586-42da-a3fd-482e66f35b70', 'Saad Imran', 'saad.imran@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'Taha Siddiqui', 'taha.siddiqui@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('fa655bb0-c122-494c-b52d-59134e821322', 'Asad Bashir', 'asad.bashir@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'teacher', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('a3dea0c4-4023-499c-a94c-b30658919d42', 'Zubair Iqbal', 'zubair.iqbal@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'whatsapp', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('3802c942-17bf-4310-ba20-f698a0ca20e3', 'Waqas Butt', 'waqas.butt@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'facebook', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'Nabeel Qureshi', 'nabeel.qureshi@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'Kamran Sheikh', 'kamran.sheikh@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'admin', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'Rayyan Bilal', 'rayyan.bilal@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'google', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'Haris Jameel', 'haris.jameel@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'student', 'whatsapp', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('6e34a162-4095-42b8-9327-d51993f0d02e', 'Faysal Shah', 'faysal.shah@example.pk', '$2a$12$eImiTXuWVxfM37uY4JANjOL', 'teacher', 'general', true, true, 'male', '2026-09-14 05:21:39.230217+00', '2026-09-14 05:21:39.230217+00', NULL);
INSERT INTO public.users VALUES ('b7325484-3d63-4308-b80b-31183e3cde40', 'Computer Analog', 'computeranalog351@gmail.com', NULL, 'admin', 'google', true, true, NULL, '2026-09-14 05:23:12.616917+00', '2026-09-14 05:23:12.616917+00', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3MzI1NDg0LTNkNjMtNDMwOC1iODBiLTMxMTgzZTNjZGU0MCIsImlhdCI6MTc4OTM2MzYyMiwiZXhwIjoxNzkwNjU5NjIyfQ.jyAc995AieDev2pPF8wsSF1JwinoljtmQ6KNzqP0Ws4');
INSERT INTO public.users VALUES ('ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'Waleed', 'hadeedtariq12@gmail.com', '$2b$16$kHj946j6.tdbemEY3VTJ..voYXekbMD3ycavYfWPhOqoYkJJHwR5K', 'admin', 'general', true, true, 'male', '2026-09-14 05:25:58.661595+00', '2026-09-14 05:25:58.661595+00', '');


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: your_user_name
--



--
-- Data for Name: societies; Type: TABLE DATA; Schema: public; Owner: your_user_name
--

INSERT INTO public.societies VALUES ('b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'Codex Computer Science Society', 'The primary tech and competitive programming hub for student developers.', 'active', '2025-01-15 10:30:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('bcdf6e95-2284-4778-9130-9420c60c98d1', 'ACM Student Chapter', 'Fostering technical innovation, hackathons, and software engineering practice.', 'active', '2025-02-20 14:15:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'Literary & Debating Society', 'Platform for parliamentary debates, bilingual declamations, and creative writing.', 'active', '2025-03-05 09:00:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('0d573514-fe91-4f7f-9967-aa740ce166f7', 'IEEE Student Branch', 'Empowering electrical, electronics, and telecom research and workshops.', 'active', '2025-04-12 11:45:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('413fe861-b177-49d3-b890-137e3169e956', 'Character Building Society (CBS)', 'Promoting ethical values, social responsibility, and civic discipline campus-wide.', 'active', '2025-05-18 16:20:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('f30e59c6-06af-44f2-9643-00174f442404', 'Performing Arts & Dramatics Club', 'Annual theater productions, mime, and cultural performance showcases.', 'active', '2025-06-22 08:30:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'Cyber Security & Forensics Guild', 'Dedicated to ethical hacking, CTF competitions, and network defense training.', 'active', '2025-07-10 13:10:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('40206ab1-f23b-47db-9548-72b566a9539a', 'Entrepreneurship & Innovation Cell', 'Incubating student startup ideas, pitch competitions, and angel investor meets.', 'active', '2025-08-29 15:00:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('3f4cc0c1-1399-47c8-b401-e75b935233c7', 'Environmental & Green Youth Club', 'Tree plantation drives, campus recycling, and climate awareness campaigns.', 'active', '2025-09-14 10:00:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('2119637a-58c5-431f-9cbb-ea930509fa52', 'Media & Photography Society', 'Capturing campus moments, event coverage, and filmmaking workshops.', 'active', '2025-10-03 12:40:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('1a06c007-6496-47c7-abab-faab23773abf', 'Robotics & Automation Club', 'Designing autonomous bots, hardware projects, and RoboWars competitions.', 'active', '2025-11-19 17:05:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('d874c820-0e5f-4999-a3da-3252d167ad4d', 'Blood Donation & Social Welfare Society', 'Organizing emergency blood drives and community relief activities.', 'active', '2025-12-08 09:30:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'AI & Data Science Circle', 'Hands-on workshops on Machine Learning, NLP, and Deep Learning research.', 'active', '2026-01-11 14:50:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'Sports & Athletics Board', 'Managing inter-university cricket, football, and indoor sports tournaments.', 'active', '2026-02-04 11:20:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'Iqbalian Philosophy & Heritage Club', 'Seminars on classical poetry, national heritage, and philosophical thought.', 'active', '2026-03-21 16:00:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'Google Developer Student Club (GDSC)', 'Google technology workshops, Solution Challenge, and web/app development.', 'active', '2026-04-15 10:15:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('74b73890-2789-43d1-ac77-fcabae188da2', 'Music & Symphony Society', 'Acoustic nights, battle of the bands, and instrumental music training.', 'active', '2026-05-30 18:30:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('159ff21a-a72e-4cff-a2a2-dc18204318fc', 'Game Development & eSports Guild', 'Unity/Unreal workshops alongside inter-college gaming tournaments.', 'active', '2026-06-17 13:45:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('d8de6dfd-5173-49d7-9b00-823a57ec5c16', 'Youth Model United Nations (MUN) Society', 'Training students for diplomacy, international relations, and public speaking.', 'active', '2026-07-09 09:10:00', '2026-09-14 05:30:27.836612');
INSERT INTO public.societies VALUES ('4d0ec48f-11c0-4756-ba46-e9416d07b928', 'Women in Tech & Leadership', 'Mentorship, tech career guidance, and empowerment for female students.', 'active', '2026-08-23 15:25:00', '2026-09-14 05:30:27.836612');


--
-- Data for Name: society_events; Type: TABLE DATA; Schema: public; Owner: your_user_name
--



--
-- Data for Name: saved_society_events; Type: TABLE DATA; Schema: public; Owner: your_user_name
--



--
-- Data for Name: society_posts; Type: TABLE DATA; Schema: public; Owner: your_user_name
--



--
-- Data for Name: saved_society_posts; Type: TABLE DATA; Schema: public; Owner: your_user_name
--



--
-- Data for Name: society_members; Type: TABLE DATA; Schema: public; Owner: your_user_name
--

INSERT INTO public.society_members VALUES ('fb18c4b8-2436-47fe-9c31-4ae85884ae3c', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'society_head', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('2c2b2001-8e9d-4108-931f-1739193a3fc9', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'admin', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('16cff441-cbed-4cc2-b2ef-c87efb0c12ca', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '6e34a162-4095-42b8-9327-d51993f0d02e', 'admin', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('2693eee4-7413-4bcf-b399-6bbb6c704cac', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('97275437-9cb0-4a96-a931-040d88a4eeb5', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('cbfdfe4a-4c3d-4821-8ad5-75108930e83d', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('7ed0de80-8509-42f6-a784-aa7946b9aed8', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('1e92d9a5-f629-4f4d-b226-8316a6e77daa', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('2a326f1a-ac1c-44d8-a697-615498bf8df4', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('6b6f2f4c-c310-4ab1-a1a6-5c6e9f4ce026', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('0111f661-a7fd-4d55-a9b1-a386b2c67f9d', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('174dca26-71d1-4b42-960d-39231a6fc485', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('d798167b-be52-48fe-8563-2e965124ecd9', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('4188e9d7-6dba-4a08-8e72-812d0ba7197f', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('19ec94cf-0a36-4098-a55c-5b1c8afb0db3', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('c376c666-152c-4737-8b0b-8014c086d7a3', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('05785b45-ec1b-4486-be7d-8700a4f5ae7e', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('4fc4beb4-a0dd-40f1-b555-8fef3ef6a125', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('5a13de7d-b80a-4210-898e-ecee296e6c22', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('708d96e6-6e1f-4481-af25-51264e24faad', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('a6ce4233-e906-4668-bc4f-6c60680ad8ba', 'bcdf6e95-2284-4778-9130-9420c60c98d1', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('e369634d-84bf-4ba8-b2b6-1f5a6021060a', 'bcdf6e95-2284-4778-9130-9420c60c98d1', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.381675');
INSERT INTO public.society_members VALUES ('4b1aaaa7-e011-404a-b51e-181fa2977a77', '1a06c007-6496-47c7-abab-faab23773abf', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'society_head', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('81545178-a13a-4407-b741-c7d0f3b8d06f', '1a06c007-6496-47c7-abab-faab23773abf', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'admin', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('726669c7-4395-4300-9299-fe9dc1a90b31', '1a06c007-6496-47c7-abab-faab23773abf', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'admin', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('041c03e8-9555-4671-9984-604d7a3c2719', '1a06c007-6496-47c7-abab-faab23773abf', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('3c033727-38cd-4c22-9472-13be8c2a887d', '1a06c007-6496-47c7-abab-faab23773abf', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('cd2a0400-28dc-46fa-8742-3d9147cf8165', '1a06c007-6496-47c7-abab-faab23773abf', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('51b7ed73-c240-48b7-8e9c-456ac37193ce', '1a06c007-6496-47c7-abab-faab23773abf', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('37099bf0-ec3f-4782-9c11-2a916db84190', '1a06c007-6496-47c7-abab-faab23773abf', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('44324ff2-4b5a-4b15-be67-c6f68658fa6d', '1a06c007-6496-47c7-abab-faab23773abf', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('a006dbde-4e58-46df-bf21-d932aed8d2cc', '1a06c007-6496-47c7-abab-faab23773abf', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('1bbf13fd-6c39-49d8-8d93-de4bfe5881e1', '1a06c007-6496-47c7-abab-faab23773abf', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('fb711133-0ef2-4eed-bbef-3a6680f15f5d', '1a06c007-6496-47c7-abab-faab23773abf', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('e5d799db-8c5b-4b58-9db8-d965c4a2ffa9', '1a06c007-6496-47c7-abab-faab23773abf', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('baeb712e-abc0-4533-85cc-305105ebda0b', '1a06c007-6496-47c7-abab-faab23773abf', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('17950935-c526-478e-a81b-3e0e45c7c845', '1a06c007-6496-47c7-abab-faab23773abf', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('4c65721b-416b-4ed4-8182-f92e818d46d7', '1a06c007-6496-47c7-abab-faab23773abf', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('18711b6f-6d96-47ff-bda9-20b504ba57c5', '1a06c007-6496-47c7-abab-faab23773abf', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('4eea3440-34b1-4e7b-a406-9915c2f37b1d', '1a06c007-6496-47c7-abab-faab23773abf', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('fefdd5eb-b934-4165-a6f3-ec701622cc9c', '1a06c007-6496-47c7-abab-faab23773abf', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('aaec5ebf-4ca0-4fd2-9c10-6961ef9e6c25', '1a06c007-6496-47c7-abab-faab23773abf', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('97b9c659-e142-4fb5-a1bd-309fcf9b93b3', '1a06c007-6496-47c7-abab-faab23773abf', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('bd56ce4b-b82e-47c3-bcee-968ad6eca656', '1a06c007-6496-47c7-abab-faab23773abf', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.390431');
INSERT INTO public.society_members VALUES ('cc24652c-eeb0-4fb1-af85-f7bdc84e6e5a', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'society_head', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('97c216a1-45df-45af-9ec0-da926104e300', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'admin', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('33c0df0f-bab8-4fcb-8ecb-c47423fa77e8', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'admin', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('c0100b63-9366-4f2b-a9c2-881c517e4fbe', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('2a7aad6b-a527-46f5-8a79-c92158890299', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('b2b87b0f-b241-421e-a93c-10d18064747f', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('317e1a36-67a8-4de3-80e6-e6eb4f722618', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('2b6095ad-6728-4bcd-9d60-a9f091dbf172', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('f96d46bd-6121-45a8-a13b-36c6e94c5982', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('ad510fca-ca19-4d29-b209-062305fdf8aa', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('a9c5b036-5d29-47e0-b801-f78ce6b388c9', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('3f801213-4847-45cd-9dcb-90dd56f37a75', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('5b773513-1a97-4384-b408-1695a1773664', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('3efb8966-9ce0-4417-bb02-35a288ee9075', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('8c0ea1c8-a892-4e41-a885-b84e5928cf91', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('a1b086e9-5bc3-44fb-8793-ae521ec648f2', 'd874c820-0e5f-4999-a3da-3252d167ad4d', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('a4051307-e366-4598-8e18-0abcf4f7b7ad', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('a69e09e0-cb72-4fb8-bcf5-22da1e71b683', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('e3cd5e3e-ac69-4bd9-ab1c-0864e65a0bcb', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('25e6cce0-57f0-49e0-bed0-8f413f86b3ed', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('bbf9e78e-45b4-42e2-9b2a-bf86763e9b0d', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('1a2dae02-0d3d-4574-b943-f21c684ed138', 'd874c820-0e5f-4999-a3da-3252d167ad4d', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.392565');
INSERT INTO public.society_members VALUES ('ca7cc768-9cfe-4d59-bc09-29cdae950496', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'society_head', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('07c675b1-6950-45f1-9ce8-dbf4931ac35d', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '3e6f6041-2277-4f18-ae4c-df227416d245', 'admin', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('fb9cd1a5-3438-416a-9945-4514b4d72550', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'admin', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('e17b26d1-e714-43c4-8052-8a1889bfbffb', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('53bd7ec5-0f9f-4b8d-b5dd-f5f1b1b13064', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('d68c7ef0-592c-4e10-9631-82efa4232e1e', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('9a85f4c9-3661-46e7-b016-50cd77ba8d87', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('25f9ef51-84fe-45d2-b385-cd828fee19ee', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('a3b66908-c8ab-4871-94dc-aa3076461d41', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('115b8ef5-a65b-4bce-b7c2-556ea400c576', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('ec2b544b-3820-4c22-be76-eeab84af5cbe', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('c24e4d05-b5fc-4097-ad5f-d7eda9497a45', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('0595a283-2ee3-47f2-a8fe-5cd2fd1e8468', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('39b1986c-72cc-42c2-a7cf-cef1a590b293', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('584b019c-8a9f-4422-9a2a-2ed902e62ca5', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('7139d2de-a32e-4e8b-9c62-e52295a5b45b', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('bfb5ffe0-8ca5-4b25-b7d7-c79b66a6881b', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('a7269255-fe75-4b4a-9071-f2cd5e52eb2d', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('fabca4d4-ebb2-4c92-a177-3e091c886e9c', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('15da9d81-765d-477d-8015-a08663478254', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('f9e73b68-6cf2-4f09-8a91-c10b25aa75d6', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('ac1f156d-87b0-4024-b74c-5f70d33585e2', 'c80e3e7d-166d-4cc3-9072-1e48a35f719d', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.396666');
INSERT INTO public.society_members VALUES ('5556bde4-e74c-475c-9f18-36d47078af72', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'society_head', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('ce38aa61-376d-4a5d-836e-62b463a29a90', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'admin', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('2232d581-1f53-4193-92c3-29d7f477e095', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'admin', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('1e35d372-ba61-4ff6-a2f9-9c84082039c5', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('3632ceb1-c001-455a-b521-c1a06ac4e1b5', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('d1c2c230-8ac9-4141-844b-bfdca1eb3f6d', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('172943a0-5b28-4048-a9a7-572ac734c325', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('44a5d919-6822-4562-9305-425cbca36950', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('c999f4e7-aa16-434a-8091-ef4f47cdbc1c', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('09cc33a1-93b3-4c28-b23a-7bc41dc38cd1', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('cb658c74-77ec-43a8-afcc-2eca9eef3f04', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('75d4bbd9-532e-4d74-a538-1617cedf77b2', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('3059db2f-1566-4ca0-ae2d-8b8616f15262', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('8d7f22aa-0f01-4874-9c22-fc417d172dbc', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('a540725d-60f5-40a0-93d5-fc88a6c135e7', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('db9a2824-a7c6-4ff8-a533-781b9a75cff2', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('4eb05b3a-03a9-497a-b950-d1ec42417e4a', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('0e8e92bc-b172-4c6c-bcc0-41114c7c4827', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('45c8c7ee-9d1b-445a-b6b6-33813e93a533', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('59acb2fb-a124-4f9c-923f-73eb107e002b', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('f9007016-5530-43fc-ab71-f83b1702ed38', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('522d7098-389c-490d-a706-705c771481fb', '6a13ace2-89c7-4ef2-b8be-cf2c7d2263c9', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.401109');
INSERT INTO public.society_members VALUES ('035d0236-0434-4d8b-bca2-704de46c830d', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'society_head', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('85cb2b5b-dd35-4e71-986b-2cea750e3b58', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'admin', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('fbd12ca6-acea-46a8-9073-eae98db1682f', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'admin', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('a0b0db70-3c53-4519-bb51-5f99e1bcf5dc', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('d6acef0c-51ab-443c-8d12-8e58627f418d', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('62da6790-96f9-48b3-8a50-8f7e8a9dd1af', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('dc1804cb-e70c-4de8-885a-2e5c2654eebe', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('170d73a4-4819-4ed9-9cec-cca255028d7f', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('ea123464-adfb-476e-a1f2-a0c56198a1d5', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('f52a11ee-a6bb-41f4-a026-3264faab5867', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('5a6606bd-0450-49a4-b133-a9f6338eb964', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('68630d5a-425d-435e-9382-112037f0d50f', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('20664f19-9413-4684-8e6f-28422bd84acb', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('4b3f779a-474f-4b03-948e-bac08ddb0801', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('0aba4dcd-d092-458e-a586-f721a22dafbc', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('3d155973-3a05-48a6-90b2-5ffad4009c6a', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('b625d7e3-60ff-46b3-8c55-c0848c2e7744', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('c40ab319-5e75-4cf2-ba3c-652b0fbaf65f', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('7d47d7be-63a6-44f7-9367-4773019be5d7', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('e4a970cf-1afe-4bdd-b7ff-391cfd607fd5', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('14184a62-b9c0-4ae3-b8db-2deda7a6ef8f', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('c5014d7b-b9b8-4162-b0a7-74646116c6eb', 'd8de6dfd-5173-49d7-9b00-823a57ec5c16', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.439625');
INSERT INTO public.society_members VALUES ('6c825422-1c55-4205-8b77-e86635e38199', '0d573514-fe91-4f7f-9967-aa740ce166f7', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'society_head', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('dd1c0fe4-6465-4d5c-8590-d8377bbcdad9', '0d573514-fe91-4f7f-9967-aa740ce166f7', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'admin', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('8e2d626c-63fc-4c1d-8e4c-5ee3da144c07', '0d573514-fe91-4f7f-9967-aa740ce166f7', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'admin', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('4f4db744-98d0-4afe-9cbb-f662cddaa995', '0d573514-fe91-4f7f-9967-aa740ce166f7', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('679d10bd-9a49-4580-a4e8-838383f701ff', '0d573514-fe91-4f7f-9967-aa740ce166f7', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('ed00e77e-9246-487f-9f53-5741a876919c', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('d7aa925b-eedf-4522-9c91-deda4f31cdf4', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('02669dfb-b538-4c62-9502-38432cccb6d1', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('39132488-6c73-4dce-adbf-ad2eacdbe820', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('bc1f1877-aa07-432d-9606-1ce7d98adaa0', '0d573514-fe91-4f7f-9967-aa740ce166f7', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('e7baafe9-892f-4333-98dc-f0769656671a', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '3e6f6041-2277-4f18-ae4c-df227416d245', 'society_head', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('350d59f1-1f07-4e01-a0ff-18fb2d35d62e', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'admin', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('0f2eb18a-b872-42f1-a24b-339679891790', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'admin', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('eaa5496d-4db1-4e10-ac96-b86aa29b9f62', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('cdcebd00-b78c-4e59-9fea-8aa446cd000c', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('b82c073b-2fad-4d00-b27f-d09da8a3bafc', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('b19f4190-2871-48c0-b95d-53c6313bcfe2', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('4e2e7be2-5863-4337-bbea-2a75704212ce', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('bd86e6a2-862a-443c-ab96-046f6a65f2d6', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('94cde2dd-1e41-48ac-b1b5-532b1dcbf14c', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('cb76839e-b4c5-409b-900a-3a1cc334ce08', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('4c548df8-4499-4d3b-ac90-a2c2b849f78a', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('1139e479-5f04-4028-890c-8db90abd194b', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('c63fe3c1-e2d2-40c9-96ff-11201e5fd74d', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('38000985-c926-4985-934b-5da8a896b516', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('80786625-0d66-4172-8b83-450a0fba874b', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('3fbd5c00-f250-45ea-a0ef-1071195c4e53', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('9e2e733c-ba7b-45e8-bec5-f9f08abd4f1c', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('070e6575-5676-417f-9bf6-124b31f96aa4', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('9101eb0d-94b1-4b53-af0b-37584be80ef0', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('a4da3b54-9737-4093-b81c-1bc780609c80', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('953f057e-2429-4fd8-9798-b4b7fa77c61c', 'fc7a5311-1ffd-4326-8f85-de1c8ea9ea7a', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.414119');
INSERT INTO public.society_members VALUES ('522c2a24-d069-4ebf-9c9c-03fac099ccd0', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'society_head', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('d2321502-7f67-41ed-a7b4-73d93999836e', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'admin', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('e21da2d1-ea0d-4e3e-a1ca-b50943e9c1df', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'admin', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('7bf07cc4-1b71-492f-abb0-e78a0e09372a', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('995bfc8d-67fc-4326-bd8b-816454950ffa', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('143bce73-619a-4e89-ad91-2e8107bd28f6', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('9603ee05-f344-45dc-8ff2-ec67a5d0c2ba', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('bd8a3c0d-e1ae-44d5-b643-79a35e4a4065', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('5603f484-30a3-4dcc-bd80-fa1b8600b5b9', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('bdd367b9-05c3-4975-85b0-3e409d8e0d67', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('7a0b9384-9bdb-4a86-aad2-cda36e4b227f', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('974db9c9-67fb-43ba-8c25-3e6692be6a7e', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('201ae195-3b06-4b55-89dd-87751862df81', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('93a7fa0b-14c8-43d1-b513-93e7be6cf299', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('a70d7f1c-3e0d-4582-aef1-0bb9c9501adf', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('ba435ecf-8ff2-4846-8160-3a2da7b20369', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('4bd263e7-c037-4f3d-9982-6587c5151dd4', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('362fd403-0aba-488a-8b86-cc03ab8e1863', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('71aab99b-1cd3-480a-bdac-99d458c59537', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('cc3bc0a7-5eed-4319-b44f-9a527131ebad', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('6865eb10-9ad2-4088-85db-e5621f618804', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('9d0c8845-b408-4dc1-9b7d-b58c1ceb09a2', 'b88faff2-209c-43bb-9b22-9f61ebb1e1de', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.424042');
INSERT INTO public.society_members VALUES ('0b53917a-5264-4ce4-a738-5fbcf3f38eb8', '74b73890-2789-43d1-ac77-fcabae188da2', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'society_head', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('feeedad8-48f1-480d-8989-5fe8716aea82', '74b73890-2789-43d1-ac77-fcabae188da2', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'admin', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('0e9ad981-603a-4a93-8367-f9c884bf1157', '74b73890-2789-43d1-ac77-fcabae188da2', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'admin', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('efb99ec7-4d65-4f3e-9957-e1c4b1c25586', '74b73890-2789-43d1-ac77-fcabae188da2', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('e26c63a6-7cdc-41d1-bc10-9142be350bf8', '74b73890-2789-43d1-ac77-fcabae188da2', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('22d82616-b13a-4cf6-8a98-0c95069d816e', '74b73890-2789-43d1-ac77-fcabae188da2', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('d82631c3-2904-43f0-b561-4d1c6daf31e9', '74b73890-2789-43d1-ac77-fcabae188da2', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('b7e77ef8-22d6-4b49-abbe-83282d8118d4', '74b73890-2789-43d1-ac77-fcabae188da2', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('48343cbe-600b-467e-93b2-c2cfd6824995', '74b73890-2789-43d1-ac77-fcabae188da2', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('6abfbc63-19b5-4996-8879-231a04c3cf07', '74b73890-2789-43d1-ac77-fcabae188da2', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('d8228a26-e2a8-423c-a0fb-2f9ca6cd1241', '74b73890-2789-43d1-ac77-fcabae188da2', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('a72e4bf6-0bfe-4a93-b90e-0c503310cca3', '74b73890-2789-43d1-ac77-fcabae188da2', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('579046aa-3778-4f33-b7d3-e1c2b3c84cbf', '74b73890-2789-43d1-ac77-fcabae188da2', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('c73674b9-1102-41f3-ba01-4d264ac26e31', '74b73890-2789-43d1-ac77-fcabae188da2', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('b47fc8d9-3ce6-481e-b731-e5b855b01027', '74b73890-2789-43d1-ac77-fcabae188da2', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('ca6edd42-082e-4aae-93b0-1c89a5cfc13c', '74b73890-2789-43d1-ac77-fcabae188da2', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('345ec37e-642e-4234-91d4-db28e223cdf3', '74b73890-2789-43d1-ac77-fcabae188da2', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('e195fa45-e20d-48db-b4e5-196ace1e6d59', '74b73890-2789-43d1-ac77-fcabae188da2', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('d951ad70-72db-4222-a422-f47d12f38ecc', '74b73890-2789-43d1-ac77-fcabae188da2', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('62060d76-8c37-4224-aa70-69d8b144f77e', '74b73890-2789-43d1-ac77-fcabae188da2', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('706fd29c-7796-41c9-b03b-a4225de943a4', '74b73890-2789-43d1-ac77-fcabae188da2', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('2dd65ed5-9da4-4863-8dc9-6edf926faab9', '74b73890-2789-43d1-ac77-fcabae188da2', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.428726');
INSERT INTO public.society_members VALUES ('47a66ba3-189f-4aa8-8695-5fc623317842', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'society_head', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('b575d8b3-5da9-49fb-9aab-cf2060de70e1', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'admin', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('321ad813-6590-4a79-af34-0167357ce616', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '6e34a162-4095-42b8-9327-d51993f0d02e', 'admin', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('1e948ded-c13b-4ad0-ba43-58be83a4893e', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('fd5041bb-fba0-4b57-aa6e-d51c49976c3a', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('af393042-1ebc-4d55-8481-cbba6b74dee8', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('2ed38241-d9eb-40af-a26f-5056cdc67f2c', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('e8b2a0d3-bbc2-4422-997f-b7c550b46a8f', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('84d9a8fd-793d-4d39-bc44-8f6ffa4d1ce6', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('4d13348d-c12d-49c5-aab1-5e91b49fb9fa', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('d5c90730-94ca-4c50-8372-d7f938d9aa05', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('99fc9193-c3c9-4217-8278-e14e5e2ccd0d', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('10b61571-1e25-4d33-ab23-07f386ab9517', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('8ea6d73a-97f7-49c9-b973-82e5d4cd3104', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('837baac4-085e-4f7c-8150-0b8ea071a613', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('711444fa-f663-4403-b15f-ba01e60b5775', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('45ea7fce-fa57-4155-9459-e17dbf8eb094', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('b4a2daf7-2acf-4a69-8428-e4b03c91a890', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('dae33b99-9665-49f3-bb71-01f0e8b4b5a7', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('1c31d4a0-341b-472b-bad2-1310a22a43d9', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('07d756a7-ae19-4ee3-a9a1-c3e1d5b3bfb7', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('5ea5cf10-2cc0-4f66-979e-cd564ec28084', '23c826ae-d4b3-43f7-863e-bea2d3988ad3', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.445612');
INSERT INTO public.society_members VALUES ('7caad0b4-f625-4971-9e23-16f7a66038e2', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'society_head', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('2bf4b1d9-0bfb-4ebc-92e5-1fa3d9398418', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'admin', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('f8500876-2173-46c7-89d9-a1c8adfd90ef', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'admin', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('0c23fafa-b6d1-46b2-a7a8-a1411cc7738f', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('536bf9af-0a5b-4780-af62-7ec8699a92e6', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('44e480dd-0423-4d48-9764-3229c21c5e11', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('ea94e62e-105f-417a-b072-742ad733b8a7', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('d07dc360-360e-471a-812a-21fd613579d3', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('47656fb1-3a6d-41a3-aa5f-0f7635aeed34', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('65909047-abc3-46fc-b9e3-a0d1c9e0fea7', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('d795947b-84bc-42b1-8608-fe6efaa185ac', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('2490410f-378a-49c4-9215-e81ffa957244', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('8d92bb41-122b-4ff4-a130-bfa3184c9603', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('40cbb498-f8fd-45c4-985a-92a80cc1846d', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('49e880b7-77f6-47af-b6d9-310514096d71', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('ce5c4e3d-6506-49f7-8c64-d552c4f3fbaf', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('64a07261-a903-479a-80c6-a364edd16312', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('d246cdff-4e44-4141-b81b-c273dfc57b76', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('9da39977-0deb-4bc6-ae75-0a0a12713f57', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('b016d145-08fa-47f1-88e2-52274bb90dee', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('ed2580b0-3702-423a-9bc6-dd467dfc6811', '159ff21a-a72e-4cff-a2a2-dc18204318fc', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('a0a2a988-3990-489b-a754-7a6d5fbc9f00', '159ff21a-a72e-4cff-a2a2-dc18204318fc', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.436075');
INSERT INTO public.society_members VALUES ('ed8f7a31-a28c-458d-ba94-25ca27735ee4', '40206ab1-f23b-47db-9548-72b566a9539a', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'society_head', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('503ec741-431d-45cc-90d4-cc23e54ac9ca', '40206ab1-f23b-47db-9548-72b566a9539a', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'admin', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('5aefc3fd-ec0c-4364-9406-1ae270fad94b', '40206ab1-f23b-47db-9548-72b566a9539a', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'admin', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('abe7e4cb-1d0b-4573-945e-2a80869b8674', '40206ab1-f23b-47db-9548-72b566a9539a', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('114e39aa-9810-4469-b9ae-bd20c4a1c8dc', '40206ab1-f23b-47db-9548-72b566a9539a', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('ca68aab8-ff14-4f72-9179-e86974a6ad08', '40206ab1-f23b-47db-9548-72b566a9539a', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('96e00500-e7f3-4911-8636-6f63188b9f4a', '40206ab1-f23b-47db-9548-72b566a9539a', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('f2822df6-5df4-4ff3-ad33-e217e1aa18bb', '40206ab1-f23b-47db-9548-72b566a9539a', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('c2581f26-a552-4e77-87a7-aacea012da21', '40206ab1-f23b-47db-9548-72b566a9539a', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('66233896-90f8-4e65-a4da-d8332d579d02', '40206ab1-f23b-47db-9548-72b566a9539a', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('660f9f07-5d18-442f-93e1-e4a5d50789b4', '40206ab1-f23b-47db-9548-72b566a9539a', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('1843f210-c79a-4923-bcee-f3a66c51a8cb', '40206ab1-f23b-47db-9548-72b566a9539a', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('2bb4e70c-59b0-46b4-a342-327919f553a7', '40206ab1-f23b-47db-9548-72b566a9539a', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('9e8bd074-24de-4a91-a33f-aef425c3a2c6', '40206ab1-f23b-47db-9548-72b566a9539a', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('556b79ee-b96b-45d7-b2fd-d1f63735924a', '40206ab1-f23b-47db-9548-72b566a9539a', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('e5f667ef-f432-4973-8e1f-e6ad6ff6a8c1', '40206ab1-f23b-47db-9548-72b566a9539a', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('a2b45707-10d0-4948-8261-5dcbfc34e96a', '40206ab1-f23b-47db-9548-72b566a9539a', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('8bcb0e88-8f67-4a70-bc5b-182c0f9b3ce4', '40206ab1-f23b-47db-9548-72b566a9539a', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('3b8c83dd-6cba-4326-ac23-39b9dde285bd', '40206ab1-f23b-47db-9548-72b566a9539a', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('ab127f17-870c-4f1d-acc9-1cf28e75dcc9', '40206ab1-f23b-47db-9548-72b566a9539a', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('22f6b9f6-fe9f-4a37-8da0-30e62719c813', '40206ab1-f23b-47db-9548-72b566a9539a', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('4405f2bc-19b9-4317-ba0b-5f48542006f9', '40206ab1-f23b-47db-9548-72b566a9539a', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.462234');
INSERT INTO public.society_members VALUES ('7d29bd4b-8f1c-4043-a04a-a6165e93fa88', '0d573514-fe91-4f7f-9967-aa740ce166f7', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('6935c2ea-5a71-4b25-88e4-b687039db4ae', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('ea47662b-adf0-405f-98cd-2f0e90e0a666', '0d573514-fe91-4f7f-9967-aa740ce166f7', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('224983c2-02d3-4165-98ab-5e0f6da7bd1a', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('46834992-b367-4739-bf81-7fc6eeeba891', '0d573514-fe91-4f7f-9967-aa740ce166f7', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('4133289b-fc7b-479f-a54a-a0c412bfc268', '0d573514-fe91-4f7f-9967-aa740ce166f7', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('98669f7a-9eaa-47a3-b718-c89529ad7f30', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('77551dc6-becc-420d-b0b5-f12d9302e118', '0d573514-fe91-4f7f-9967-aa740ce166f7', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('e264d227-4ba0-4407-b260-5d977c07ec92', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('d99ec479-df0a-497d-aa36-7dcbcddbff9e', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('49fb09a4-d6f1-46ff-bffe-272e1cc7fc1c', '0d573514-fe91-4f7f-9967-aa740ce166f7', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('202aa8d8-6841-415e-823d-715370b914d7', '0d573514-fe91-4f7f-9967-aa740ce166f7', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.447492');
INSERT INTO public.society_members VALUES ('6bdcbdeb-4d9c-4793-8b8e-d235e94fdde8', '413fe861-b177-49d3-b890-137e3169e956', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'society_head', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('0ddd1f67-3a71-40f6-a7f4-d6beb1655b53', '413fe861-b177-49d3-b890-137e3169e956', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'admin', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('dfb02f79-a655-44fb-b950-32f6f3336f1f', '413fe861-b177-49d3-b890-137e3169e956', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'admin', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('0f4e5163-30eb-46c1-9311-a228492bd786', '413fe861-b177-49d3-b890-137e3169e956', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('ab718ac8-414f-43b2-818a-7beb9ddf8e50', '413fe861-b177-49d3-b890-137e3169e956', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('01cc1659-8e31-46de-af72-67c6b9f0fc7d', '413fe861-b177-49d3-b890-137e3169e956', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('4e178cb4-42e6-4c77-9207-acfab799cbf5', '413fe861-b177-49d3-b890-137e3169e956', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('415d39a7-bb6c-4116-b579-1eb96c341c91', '413fe861-b177-49d3-b890-137e3169e956', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('b1166335-6ec3-4f4c-8837-8bbd20025a1a', '413fe861-b177-49d3-b890-137e3169e956', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('40232a3c-a0ba-491e-abf0-a676372cac92', '413fe861-b177-49d3-b890-137e3169e956', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('baa5a8fc-1f62-44f1-9cb6-8b136ac6e89f', '413fe861-b177-49d3-b890-137e3169e956', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('dbb13ac0-6a00-4182-980d-7033eef953c6', '413fe861-b177-49d3-b890-137e3169e956', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('81a66d64-006f-4750-bf7c-6ae608d85f81', '413fe861-b177-49d3-b890-137e3169e956', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('342c2fb8-735c-4ed0-9636-63885b75e726', '413fe861-b177-49d3-b890-137e3169e956', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('f55ab9cf-7ffe-455a-845b-8b3000bc4630', '413fe861-b177-49d3-b890-137e3169e956', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('ff597787-095f-4887-a1c0-3f9030233aef', '413fe861-b177-49d3-b890-137e3169e956', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('73d66fbb-7a7d-4719-8398-7a78058dfd08', '413fe861-b177-49d3-b890-137e3169e956', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('c1325b44-f584-478c-be32-c6018229ce3e', '413fe861-b177-49d3-b890-137e3169e956', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('b92af3b6-e4a3-443e-93be-1a7db190ab8b', '413fe861-b177-49d3-b890-137e3169e956', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('f8caedd2-9782-44b5-94e8-430f955120ac', '413fe861-b177-49d3-b890-137e3169e956', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('39758633-82ab-4d1d-b323-17a4e78faf66', '413fe861-b177-49d3-b890-137e3169e956', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('859082e2-3993-4c83-87af-0a5a7bfc0a84', '413fe861-b177-49d3-b890-137e3169e956', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.449472');
INSERT INTO public.society_members VALUES ('3c302011-cd03-418f-95e1-49cb1e3fa307', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'society_head', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('8ea5402c-142d-4365-b8c4-61cf1091b8a4', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'admin', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('9d317265-634e-4be8-88b3-4ce20b1009e0', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'admin', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('0715b423-ef2c-4b71-9717-2f89f26c895e', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('28bcc9c6-7733-482a-841d-3d4303671cc0', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('f45c62ff-2afd-49e8-bbb6-1e9e5f652dcd', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('624483d1-64ab-4ac7-82a2-ea164351a621', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('8a49e043-4b4f-49d0-823b-b8abc591a363', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('12bc3357-991c-4924-81ef-47ce9f1c20dc', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('4d3d6b32-a5ce-4c44-8b63-158abd0b05ea', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('b17c2a05-8e20-43b0-b292-2152ef512e37', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('f2e96c2c-7cfe-40af-b647-fff765f00c51', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('b4429670-8bb0-4874-a2b2-a040e20efab6', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('003a07d6-5ef7-4220-873d-ed447a0d9bc9', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('ead5142d-4578-49b4-9838-84461e57eddb', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('d471a7dc-7cef-446c-9b42-ce677d8708e0', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('d641fad8-cb65-4e19-91ee-470ef0a09017', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('e5b04805-1457-4d81-a96c-117bad168aa8', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('61edf7b4-54f9-4396-8a3a-64236eaea588', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('4358d513-c893-4bec-8d5d-025e52e18cd9', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('c8b840f7-24c6-4e14-8849-86ee01896f9d', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('dc4f252c-3bb3-4c2d-ae61-48e79830ec46', 'b45d0513-9baf-496e-9a7f-f516e2ad2e03', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.453088');
INSERT INTO public.society_members VALUES ('04b3735c-5c4d-48df-82e3-59a587562809', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'society_head', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('96bbeb98-d6c2-4fb3-9f12-d59f5c178baa', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'admin', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('f7de6a9d-fc7d-461a-a787-fa65e1e80734', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'admin', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('c021267e-397f-4910-a802-34da53c9be2f', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('8db3d350-8fed-4293-90b0-d89ac15292c7', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('49299d74-6f0b-4a1e-9d84-aeacf7dc1705', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('37ec1c68-3219-485c-bcef-2ae8aa0cebf1', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('bc119c0f-5ea5-4a04-9e0f-cde26d440254', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('825df8b1-1322-4747-853f-85b59219370a', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('4626b49e-66a0-4951-bffd-265bbbf29c39', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('3b7b316e-1415-4976-808a-880d7a615f70', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('273bede4-7c88-4032-8c40-f59ed6ba0d7c', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('6ad3e3ac-ddf1-4718-bdfe-21b7d0016fc6', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('9e470455-2310-4149-9683-bd51b5959f8d', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('b051cb06-b122-4ec0-a409-280d34762184', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('ad874b25-2611-4ba3-8ae2-3182108f12cf', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('35f04cd8-40ce-4db5-91ed-cbb46a9ce3c0', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('70e0e02a-b78c-4509-92d7-6d3efce17d10', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('bcdffe1f-6e95-44ad-94e1-3a8bef08a3a2', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('b44e9512-b57e-488c-8f1f-8438a44474d9', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('4cbef220-8060-47b7-903f-0e5659f849a0', '4d0ec48f-11c0-4756-ba46-e9416d07b928', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('c52ea339-a7e1-4955-ae11-abc08caa177b', '4d0ec48f-11c0-4756-ba46-e9416d07b928', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.455617');
INSERT INTO public.society_members VALUES ('de663ddd-b387-43a1-bec7-aeeadfbbe494', 'f30e59c6-06af-44f2-9643-00174f442404', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'society_head', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('17c9216b-6adf-4905-9ad5-db4035689ed5', 'f30e59c6-06af-44f2-9643-00174f442404', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'admin', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('ada1f811-dd68-41ea-b3ac-b20ffac2baa2', 'f30e59c6-06af-44f2-9643-00174f442404', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'admin', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('de54f66f-a764-43dd-a816-0405643e59d7', 'f30e59c6-06af-44f2-9643-00174f442404', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('c0eb6e2a-956a-4475-a1a4-cff6e9ff7071', 'f30e59c6-06af-44f2-9643-00174f442404', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('84617dfa-05e6-4327-ab5d-043d1d623457', 'f30e59c6-06af-44f2-9643-00174f442404', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('388ba688-25c1-424a-972c-92299c32297b', 'f30e59c6-06af-44f2-9643-00174f442404', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('1a513a66-d6fe-4908-b033-bed91fba3100', 'f30e59c6-06af-44f2-9643-00174f442404', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('b5ecf02f-c471-4003-9a9f-da2de6f09fe0', 'f30e59c6-06af-44f2-9643-00174f442404', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('86fd42cc-1e38-4d0e-aec0-6bd827ba1810', 'f30e59c6-06af-44f2-9643-00174f442404', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('84f9981b-1f6f-4632-b5af-8736c767d0df', 'f30e59c6-06af-44f2-9643-00174f442404', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('d1bb631e-f19c-4fa3-b793-620d08bfaf2e', 'f30e59c6-06af-44f2-9643-00174f442404', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('9cfc3c91-9e66-4e8a-8a92-d627679339be', 'f30e59c6-06af-44f2-9643-00174f442404', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('ed978496-14cf-4778-abc1-ab6af749cf53', 'f30e59c6-06af-44f2-9643-00174f442404', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('c398d050-b7c9-4cd4-bcdb-d287a47ec7b7', 'f30e59c6-06af-44f2-9643-00174f442404', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('eebd5fd5-1b7b-42dc-b573-7ec6b4b8a7ea', 'f30e59c6-06af-44f2-9643-00174f442404', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('9294defe-d032-4af1-8504-832b7a979284', 'f30e59c6-06af-44f2-9643-00174f442404', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('fae0c6f2-f8b7-40bb-a21f-cc5a57e49fc2', 'f30e59c6-06af-44f2-9643-00174f442404', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('35a067ea-7463-4a93-b1f0-60b4668d59ac', 'f30e59c6-06af-44f2-9643-00174f442404', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('a951e030-1c2a-4894-8f24-b6dd8e05686f', 'f30e59c6-06af-44f2-9643-00174f442404', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('da9e9ac0-64b6-4046-be64-9d4e06793b49', 'f30e59c6-06af-44f2-9643-00174f442404', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('f15c2d61-84bc-48f4-83dd-1e5e18314e3f', 'f30e59c6-06af-44f2-9643-00174f442404', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.458907');
INSERT INTO public.society_members VALUES ('cfa674f3-f746-4f23-8540-fb0faf3fdd24', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'society_head', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('5f2ef984-8f3b-4964-afa0-399bda4b0e87', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'admin', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('2a3d2d9d-d6cf-486d-b3f3-665aab727ccb', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'admin', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('64505c5c-b48b-4bd2-bf59-375eb0f0e86b', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('78b1d9c4-8a0f-45f2-a96f-472e32018364', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('bbd45a7c-354b-4125-92ef-d85f2a5aba66', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('538aad1c-af1e-4110-8785-6e73bf51397d', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('bed30908-2b90-437d-9402-e439a7ee5392', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('fe3878a3-dad5-4fe2-9185-ddac2b930a20', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('883ae9ab-c633-4940-99c7-5cd110211a7d', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('4f678128-db93-4a0d-850e-96286ffe46b1', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('17953941-cd7a-441f-b1b9-8a7e4f15c8fb', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('31b5463c-6c8d-46e2-bced-f7cbbe37adf2', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('c15008ac-3827-4745-ad7c-df01d0125827', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('5bb6ef0a-1601-47fc-84ad-3b7eaab0de47', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('486c5251-c524-49ab-b28b-cd0ce892aef0', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('31e1ebdc-c67b-45cd-b819-2e39b4d9b999', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('50c526a5-5dad-4bdb-a479-8dfd82e996cc', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('95ddfebb-3a53-4bbd-abf2-68a10b7581a9', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('b647e4e2-495d-4283-8b75-61662360dcd4', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('41c87a60-339d-442c-946c-bb030c8c865c', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('2aca0637-0123-41d4-ac8d-4e39c57efc2a', 'fa16e7a6-e8f1-4392-9970-efe6d2642a16', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.472501');
INSERT INTO public.society_members VALUES ('1c4c5260-1236-4c1b-b949-759a38c4cc2d', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'society_head', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('c57e91f1-1b3d-4b6c-b003-ce2274d692ef', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'admin', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('50cab27c-7661-458a-881b-24b4b04e9309', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'admin', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('ba66421d-cbc6-4783-a29a-0a672f39e3e0', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('4e2ab15e-efd7-4926-848f-1c50420e3cb9', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('40851998-09a4-4350-a4b6-c030011dcd94', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('97e02bc7-c2c5-4b38-afa9-f3dccd4685eb', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('469e5fb5-0eeb-41fb-b496-3562b25590da', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('1e391a5a-1925-464a-a739-fa453f2a11ec', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('24c97109-9100-4796-a967-f32791e66647', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('1c96f03e-05b7-42ad-8e1f-a43f75c176ed', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('bdda190b-fc0d-4bee-b976-7e3ff88f6c39', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('22cd1ec6-b468-46f0-b9e9-afe384568039', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('fc6c234d-45b9-4ea4-ad8b-5331d3307431', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('3121d472-6614-4723-90f3-dcd1bb289a0f', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('af7cae90-e273-4f9f-9877-0fa4c451bad9', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('c882d976-077c-40c5-a2f6-70a3332563b0', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('8ddf144f-6db3-4510-9937-888a2a855d85', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('ca5da197-428c-47a5-a0f6-842672a5b65a', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('8dd7c590-7283-400f-90eb-f992fedc9bed', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'fa655bb0-c122-494c-b52d-59134e821322', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('1f26edeb-5b67-4dde-8f7f-addb6eae3fa4', '3f4cc0c1-1399-47c8-b401-e75b935233c7', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('091e85dd-7093-49f5-97b1-2c0557999680', '3f4cc0c1-1399-47c8-b401-e75b935233c7', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.499411');
INSERT INTO public.society_members VALUES ('e1caf163-2e2c-4783-a31c-95fcc9d5e4e4', '2119637a-58c5-431f-9cbb-ea930509fa52', '64d07f7e-1bcd-470a-80a6-6a629acde845', 'society_head', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('f5674d52-c418-47b3-b229-d82300198e81', '2119637a-58c5-431f-9cbb-ea930509fa52', '3802c942-17bf-4310-ba20-f698a0ca20e3', 'admin', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('44c76aaf-8bf5-411d-9b6d-3e5cde6637e4', '2119637a-58c5-431f-9cbb-ea930509fa52', 'fa655bb0-c122-494c-b52d-59134e821322', 'admin', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('563e8f53-7801-419c-9105-41dd7847d242', '2119637a-58c5-431f-9cbb-ea930509fa52', 'a7a053b8-5586-42da-a3fd-482e66f35b70', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('acbe7c4c-1178-41ca-b81f-1345e66c2cbb', '2119637a-58c5-431f-9cbb-ea930509fa52', 'e51834e5-e661-4ad6-b698-4efcf42d2ebe', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('11517034-4b15-449b-9ab5-8157a305eff3', '2119637a-58c5-431f-9cbb-ea930509fa52', '33660b32-3e22-4b11-88b4-6a181ab7fe33', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('106cf121-0fc3-48b0-aea3-285d423c4231', '2119637a-58c5-431f-9cbb-ea930509fa52', '7c15556b-c74c-446d-b9f6-451c1dc38cbd', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('ffd0b393-990d-4fab-8ab1-364ec624386a', '2119637a-58c5-431f-9cbb-ea930509fa52', '19177d7f-5ee9-43fc-a343-c8c970618d84', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('90af64c6-ac5d-4315-8266-9ef043843293', '2119637a-58c5-431f-9cbb-ea930509fa52', '67404ad1-38ef-4bb9-8cbb-69aacb6d75e5', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('a1301dbc-8c2c-45d9-929e-dadbadbf14d7', '2119637a-58c5-431f-9cbb-ea930509fa52', 'b7325484-3d63-4308-b80b-31183e3cde40', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('0cfd5c4a-f150-4551-93ef-3796ce87c019', '2119637a-58c5-431f-9cbb-ea930509fa52', '89498094-1273-4f3e-b5c1-5a2f99b74e6f', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('2335b6d1-0791-402d-a3d5-776524c6f78e', '2119637a-58c5-431f-9cbb-ea930509fa52', '6e34a162-4095-42b8-9327-d51993f0d02e', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('0e04824a-6199-49de-9e2f-eadd2fc08cc3', '2119637a-58c5-431f-9cbb-ea930509fa52', '05d839d2-70e4-42b2-a9ec-3f734a6c548f', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('37c8de93-8176-4733-92ff-ba5765efd8e3', '2119637a-58c5-431f-9cbb-ea930509fa52', '11fc43c8-959a-4a6d-a5a0-5945ab513ca5', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('85789386-0cce-4eed-ba79-d32a02cd32de', '2119637a-58c5-431f-9cbb-ea930509fa52', 'f17d4f7c-fdbc-42e4-a6be-3bab90a258fa', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('13256620-5ecd-46e8-9652-ae7b452ed245', '2119637a-58c5-431f-9cbb-ea930509fa52', 'de80df18-bc8f-43d8-9f75-bcf24dcea29c', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('9a310545-50da-4fb9-bf81-05949f015112', '2119637a-58c5-431f-9cbb-ea930509fa52', 'ecebb7af-3da0-48a0-86f0-d9ea3249b4d0', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('9ecac2d1-6b7a-47be-b1cf-5fbb9cacb63f', '2119637a-58c5-431f-9cbb-ea930509fa52', 'a3dea0c4-4023-499c-a94c-b30658919d42', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('36ff9c1b-0b07-4fb9-9942-18d878209662', '2119637a-58c5-431f-9cbb-ea930509fa52', 'bf15e1b0-3df0-4c33-b13f-cf17a9cfbe76', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('2a3f2129-c784-45c9-9c18-22b3a14f2330', '2119637a-58c5-431f-9cbb-ea930509fa52', '4b05be44-cb17-4f63-b20f-a67636bee19a', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('e4f34211-0a83-451d-8b98-cc866f7c6ec6', '2119637a-58c5-431f-9cbb-ea930509fa52', '3e6f6041-2277-4f18-ae4c-df227416d245', 'member', 'active', '2026-09-14 05:34:31.513291');
INSERT INTO public.society_members VALUES ('452f3843-569c-4510-a07a-70ea6505ac7b', '2119637a-58c5-431f-9cbb-ea930509fa52', 'b1810386-398e-4e8a-9f7b-d48e924ef588', 'member', 'active', '2026-09-14 05:34:31.513291');


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: your_user_name
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 11, true);


--
-- PostgreSQL database dump complete
--

\unrestrict hn5ZnMfWR0QaavRJy30BuXrTp99d0nhCasyQVRjp3ikyQDcPN3y8X7ou7m4fkA3

