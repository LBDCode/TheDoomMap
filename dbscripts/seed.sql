SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 25557)
-- Name: storm_track_lin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storm_track_lin (
    gid integer NOT NULL,
    stormname character varying(50),
    stormtype character varying(50),
    advdate character varying(50),
    advisnum character varying(50),
    stormnum numeric,
    fcstprd numeric,
    basin character varying(50),
    geom public.geometry(MultiLineString)
);


ALTER TABLE public.storm_track_lin OWNER TO doommapuser;

--
-- TOC entry 216 (class 1259 OID 25555)
-- Name: storm_track_lin_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.storm_track_lin_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storm_track_lin_gid_seq OWNER TO doommapuser;

--
-- TOC entry 3910 (class 0 OID 0)
-- Dependencies: 216
-- Name: storm_track_lin_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.storm_track_lin_gid_seq OWNED BY public.storm_track_lin.gid;


--
-- TOC entry 3765 (class 2604 OID 25560)
-- Name: storm_track_lin gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storm_track_lin ALTER COLUMN gid SET DEFAULT nextval('public.storm_track_lin_gid_seq'::regclass);


--
-- TOC entry 3904 (class 0 OID 25557)
-- Dependencies: 217
-- Data for Name: storm_track_lin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.storm_track_lin (gid, stormname, stormtype, advdate, advisnum, stormnum, fcstprd, basin, geom) VALUES (16, 'Hilda', 'TD', '800 AM PDT Thu Aug 05 2021', '24', 8.0, 120, 'EP', '01050000000100000001020000000500000066666666664660C000000000000035409A999999997960C03333333333B33540CDCCCCCCCCBC60C0000000000080364033333333330361C033333333333337409A999999994961C06666666666E63740');
INSERT INTO public.storm_track_lin (gid, stormname, stormtype, advdate, advisnum, stormnum, fcstprd, basin, geom) VALUES (17, 'Jimena', 'TS', '500 AM HST Thu Aug 05 2021', '11', 9.0, 120, 'EP', '01050000000100000001020000000700000066666666662661C09A9999999919304066666666663661C00000000000803040CDCCCCCCCC5C61C0000000000080314066666666668661C000000000008032400000000000B061C00000000000803340CDCCCCCCCCDC61C0CDCCCCCCCC4C34409A999999990962C06666666666E63440');


--
-- TOC entry 3911 (class 0 OID 0)
-- Dependencies: 216
-- Name: storm_track_lin_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.storm_track_lin_gid_seq', 17, true);


--
-- TOC entry 3767 (class 2606 OID 25565)
-- Name: storm_track_lin storm_track_lin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storm_track_lin
    ADD CONSTRAINT storm_track_lin_pkey PRIMARY KEY (gid);

