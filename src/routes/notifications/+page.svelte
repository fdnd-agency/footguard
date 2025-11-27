<script>
    import NotificationItem from "$lib/components/NotificationItem.svelte";
    import emails from "$lib/data/demoEmails.json";
</script>

{#each emails as email}
    <NotificationItem
        sender={email.sender}
        subject={email.subject}
        snippet={email.snippet}
        timeLabel={email.timeLabel}
        timeDate={email.timeDate}
        href={email.href}
        initiallyStarred={email.initiallyStarred}
    />
{/each}

