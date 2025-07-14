/*:
 * @plugindesc Adjusts the Z-order of reflection layer to render above Galv's -Z layers in Galv_LayerGraphics.
 * @author mugen808
 *
 * @help
 *    808_SWR_LayerZ
 *==============================================================================
 * This plugin should be placed below both the Simple Water Reflection and
 * Galv's layers plugins.
 * It will ensure the reflection layer is drawn above Galv's layers with
 * negative Z values.
 *
 * - Requirements:
 *   Galv_LayerGraphics (on top) (works with 2.0)
 *   SimpleWaterReflect (middle position) (works with 0.8b)
 *   This plugin (last position)
 */
(function() {
    // Checking dependencies are loaded
    function isPluginLoaded(name) {
        return !!PluginManager._scripts.find(script => script.toLowerCase() === name.toLowerCase());
    }

    // Required plugins
    if (!isPluginLoaded('808_SWR_SimpleWaterReflect') || !isPluginLoaded('Galv_LayerGraphics')) {
        var message = '808_SWR_LayerZ plugin: Required plugins are missing. Ensure both Simple Water Reflection and Galv MV Layer Graphics are active or remove 808_SWR_LayerZ.';
     
        // Show warning
        alert(message);

        // Log to console
        console.warn(message);

        return; // Exit the plugin if dependencies are missing
    }
 
    // Call parameters from SWR
    const parameters = PluginManager.parameters('808_SWR_SimpleWaterReflect');
 
    window.simpleWaterReflectParams = {
        reflectOpacity: Number(parameters['Reflect Opacity'] || 128),
        reflectScale: Number(parameters['Reflect Scale'] || 1),
        reflectHorizontalScale: Number(parameters['Reflect Horizontal Scale'] || 1.05),
        reflectVerticalScale: Number(parameters['Reflect Vertical Scale'] || 0.85),
        reflectHero: JSON.parse(parameters['Reflect Hero'] || 'false'),
        reflectFollowers: JSON.parse(parameters['Reflect Followers'] || 'false'),
        reflectEvents: JSON.parse(parameters['Reflect Events'] || 'false'),
        waveAmplitude: Number(parameters['Wave Amplitude'] || 2),
        waveFrequency: Number(parameters['Wave Frequency'] || 3),
        distortionAmplitude: Number(parameters['Distortion Amplitude'] || 0),
        distortionFrequency: Number(parameters['Distortion Frequency'] || 0),
        rippleAmplitude: Number(parameters['Ripple Amplitude'] || 0),
        rippleFrequency: Number(parameters['Ripple Frequency'] || 0),
        reflectionOffset: Number(parameters['Reflection Offset'] || 0),
        reflectionAngle: Number(parameters['Reflection Angle'] || 5),
        reflectionLayer: Number(parameters['Reflection Layer'] || -1),
    };

    // Function to update reflection layer Z-order
    function updateReflectionLayerZ() {
        if (Galv && Galv.LG && this._reflectionLayer) {
            let maxNegativeZ = -Infinity;
            let minPositiveZ = Infinity;

            for (const id in this.layerGraphics) {
                const zValue = this.layerGraphics[id].z;
                if (zValue < 0 && zValue > maxNegativeZ) {
                    maxNegativeZ = zValue;
                }
                if (zValue >= 0 && zValue < minPositiveZ) {
                    minPositiveZ = zValue;
                }
            }

            if (maxNegativeZ > -Infinity) {
                this._reflectionLayer.z = maxNegativeZ + 0.5;
            } else {
                this._reflectionLayer.z = simpleWaterReflectParams.reflectionLayer;
            }

            if (minPositiveZ < Infinity) {
                this._reflectionLayer.z = Math.min(this._reflectionLayer.z, minPositiveZ - 0.5);
            }

            if (this._reflectionLayer.parent) {
                this._reflectionLayer.parent.removeChild(this._reflectionLayer);
            }
            this._tilemap.addChild(this._reflectionLayer);
        }
    }

    // Override the createParallax method
    const _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
    Spriteset_Map.prototype.createParallax = function() {
        _Spriteset_Map_createParallax.call(this);
        setTimeout(() => updateReflectionLayerZ.call(this), 1000);
    };

    // Override the update method
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        updateReflectionLayerZ.call(this);
    };
})();