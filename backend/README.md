# CHS backend

## Prepare

Generate a ssh key:

```bash
ssh-keygen -f chs-key
```

Encode and place to `.env`:

```bash
cat chs-key | base64 -w0 | printf '\nSSH_KEY=%s' >> .env 
```

## Develop

```bash
npm i
npm run dev
```
