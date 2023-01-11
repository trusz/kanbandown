<script>
    import { CompItem } from "$lib"
    import { Example } from "$lib/components/internal"
    const label= "a short description about the task"
    let sliderValue = 300
    $: containerWidth = `${sliderValue}px`
</script>


<h1>Presence</h1>

<Example name="Item">
        <CompItem label={label} />
</Example>

<Example name="Item in Container">
    <div>
        <label for="width-ranger">Width</label><br/>
        <input id="width-ranger" type="range" min=200 max=500 bind:value={sliderValue} />

    </div>
    <div class="container" style:width={containerWidth}>
        <CompItem label={label} />
    </div>
</Example>

<style>
    .container{
        display: inline-block;
    }
</style>