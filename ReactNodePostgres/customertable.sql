PGDMP     	    ;                |            customerdata    15.5    15.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    117844    customerdata    DATABASE        CREATE DATABASE customerdata WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE customerdata;
                postgres    false            �            1259    117845    customertable    TABLE     �   CREATE TABLE public.customertable (
    sno integer NOT NULL,
    customername text,
    age integer,
    phone bigint,
    location text,
    createdat timestamp without time zone
);
 !   DROP TABLE public.customertable;
       public         heap    postgres    false            �          0    117845    customertable 
   TABLE DATA           [   COPY public.customertable (sno, customername, age, phone, location, createdat) FROM stdin;
    public          postgres    false    214   �       e           2606    117851     customertable customertable_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_pkey PRIMARY KEY (sno);
 J   ALTER TABLE ONLY public.customertable DROP CONSTRAINT customertable_pkey;
       public            postgres    false    214            �   C  x����R�0@�����X_�wʥ������h��,3&�M��kl�d=X�ݖvϞ������ae�'���R�X	�f��{�1��1��*bb7f�2��3gr�Ù�&�.�� �ʳ4���NSS뉞v���E,_�_�~5��۟*��B&i�����׮���l� 	{�ޙh���x	,Pph\a��y����	�v�D����=y�@�� ��r�m�}6�<݄[6�mέ�N����������ĀF�1���cE`p����� �`x��~}> �8��-��'���,K�$���=�^+@J�p\k�]Z�L\�j��8�j��j��K8�5⻵�	_Ⱦ�H�(�t�|t��#8�u��n��||a�����L0��>��rB
��ĸW���Z�9����s�˰�19 �s=+Lm��	os�����r�����c��z����"p+]tq𐚀����g���i�q�x啙���%l�1�D�����дB�ERG^_�3�N�f���H�@
׺����� ��DL�F/pd�� uY\Fﾖ�u�Q�4{���n���΂<h!� S��*�������w���m�C�X���=A�#��줍�8���Œ_4p�/�}����M;I�p�����f�J(�2d���E�����D'������x#i$���8�w	2�C2�d'zRcN�τQ髊���:CS��$9�&����)���M�t�"�@�f+��@f�yH,�	\�je����@���a��@f�ת�5s+!� YK8N:��ϛA��$o\��S���C_���j�{��̕_;[[[�T��'     