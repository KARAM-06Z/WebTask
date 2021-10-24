PGDMP     /    5            	    y           webtask    14.0    14.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    webtask    DATABASE     k   CREATE DATABASE webtask WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE webtask;
                postgres    false            �            1259    16408    devices    TABLE       CREATE TABLE public.devices (
    id integer NOT NULL,
    device_id character varying(7),
    device_number character varying(15),
    device_name character varying(32),
    latitude real,
    longitude real,
    created_at date,
    updated_at date,
    is_deleted boolean
);
    DROP TABLE public.devices;
       public         heap    postgres    false            �            1259    16407    devices_id_seq    SEQUENCE     �   CREATE SEQUENCE public.devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.devices_id_seq;
       public          postgres    false    212            �           0    0    devices_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;
          public          postgres    false    211            �            1259    16396    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(32) NOT NULL,
    password character varying(128) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    is_deleted boolean
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16395    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            b           2604    16411 
   devices id    DEFAULT     h   ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);
 9   ALTER TABLE public.devices ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            a           2604    16399    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �          0    16408    devices 
   TABLE DATA           �   COPY public.devices (id, device_id, device_number, device_name, latitude, longitude, created_at, updated_at, is_deleted) FROM stdin;
    public          postgres    false    212   �       �          0    16396    users 
   TABLE DATA           X   COPY public.users (id, email, password, created_at, updated_at, is_deleted) FROM stdin;
    public          postgres    false    210   �       �           0    0    devices_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.devices_id_seq', 39, true);
          public          postgres    false    211            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 71, true);
          public          postgres    false    209            f           2606    16413    devices devices_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.devices DROP CONSTRAINT devices_pkey;
       public            postgres    false    212            d           2606    16401    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �   )  x����N[I�?;O�����c�|L� ğ]J�V�J��в�HmoT��{�f���J�`	�_���W�_���$%�֔JU/)��ꦿ���D�]�م$w��c���m[���H�W!%�� �,Q5`�u���XLǇ!jd�5J/��8�m,�����0��g+���DogA�&�'�K�P7�l��bYƊ��S����!�ŒKQKb<�|`�h^����� 	�L'{A���e��^��k~ꢥbFb�j#`�c�O�F��oF�V\э� ��Y^~[|~����a=�v�fa��R+M�����p6u�xTNM��j`e�4�$B�d
��C(�0et^2Vl�b�w�/��%����IԱ���Ǧ�!���������Y+q�"�W�yj�B_���ܤ)F��m���}�S-K�VS�U�׈ ���� �ZQ��ۓD�3��b:1�h�;�v>ϲ�8-����Xlϩ�S�l�#�tU�
�^UF��o�:]ag2��(.�������������|\��� �.�'˸�62-[� ��n%���]z�����������G����.'@C��vR��7
����x�����:�>�c�x8���"�Às���^�n���K`���5�G�3�,���~����w�����t�!�6[�̬��[��.X��0�s�Z�2e5}�_#�����#3"�F�;d$ְ���/��dȲ�{�<��W�Ӷ%�64Fen@�A(�� !j�}"�K��}"��;��V!Y�Ȏ�A�B�Aj��d��e��^�r�����4Q7TÑ��}�&��OQ�b�      �   �  x�}�[o7����ï	DR���4n�K� 7E�)�����u��g��50��?���(��s�ҋ�;�2��7=�������3�c�^�dñ%kS����"e��;�w��I<w:��#�G�0mw7O����`�B�Q+�4�)�(܅�I�L���������1����j~������Yd�΁H��l$�֋b��<�����e��Y8���"�=�����<K''+�֞��,��C���RGM��g�M!���gJ(������\���Ǌua�A)HcT�V��J�Ơ�ĄRV�٭8L)e�M/�ճ���Ҥ�B&�L�f5��!�{�iUK�yR�RS�B�����劒��Y�"=��c"Njy�5�R���q4I�)m������Xi -��:F;�(vNiΜS!�nԇd*�� E�B�꼥�OWJ��P�c"�W���e�;�� �*|X}����������)q�e�y�֐�x�4��=6`�S�X��\(�������=�$�ZAkM%Z-��g���<�֦%g2���0��͖�-ʊ"1����2���R�8lpnda���j�Po�R�0e1�������ގ���δ�Q�G�X�J��0�N�JM�;������/�u���1�Z���x�R82���@N�V�j�B��������_���robKl�/�L)��Ĕf�H���	"\ZC6���������ͳ۱�D60\\1ߌlN(�[Ő,N���D��Y�l�������w�~��y�s
� ���PTIf��@ \�ku��:�C���_}���?�u�a���؈u{T��P1�(�&�S�����O�VϯO�;&mRs
�>E�9�m�F	5�?S.=!L�>@�{����_?��v��F�ĢGullM�5�F���ѣ�HtP}���x��|�+�     