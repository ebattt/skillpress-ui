/**
 * DashboardSettingsForm -- inline edit/save settings form section.
 *
 * @public-component dashboard-settings-form
 * @public-data data-dashboard-settings-form, data-dashboard-settings-form-section, data-dashboard-settings-form-actions, data-dashboard-settings-form-edit, data-dashboard-settings-form-save, data-dashboard-settings-form-cancel, data-dashboard-settings-form-field
 * @public-event sp:dashboard-settings-form:edit, sp:dashboard-settings-form:save, sp:dashboard-settings-form:close
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function findRoots(context) {
        var scope = context || document;
        var roots = [];
        if (scope.matches && scope.matches('[data-dashboard-settings-form]')) roots.push(scope);
        if (scope.querySelectorAll) {
            roots = roots.concat(Array.prototype.slice.call(scope.querySelectorAll('[data-dashboard-settings-form]')));
        }
        return roots.filter(function (root, index, list) {
            return list.indexOf(root) === index;
        });
    }

    function getSection(root, sectionId) {
        if (!sectionId) return null;
        return root.querySelector('[data-dashboard-settings-form-section="' + sectionId + '"]');
    }

    function getFields(section) {
        return Array.prototype.slice.call(section.querySelectorAll('[data-dashboard-settings-form-field]'));
    }

    function getActions(section) {
        return section.querySelector('[data-dashboard-settings-form-actions]');
    }

    function getEdit(root, sectionId) {
        return root.querySelector('[data-dashboard-settings-form-edit="' + sectionId + '"]');
    }

    function snapshot(section) {
        getFields(section).forEach(function (field) {
            field.dataset.dashboardSettingsFormSnapshot = field.value;
        });
    }

    function restore(section) {
        getFields(section).forEach(function (field) {
            if (Object.prototype.hasOwnProperty.call(field.dataset, 'dashboardSettingsFormSnapshot')) {
                field.value = field.dataset.dashboardSettingsFormSnapshot;
                delete field.dataset.dashboardSettingsFormSnapshot;
            }
        });
    }

    function setEditing(root, sectionId, editing, restoreValues) {
        var section = getSection(root, sectionId);
        if (!section) return false;

        if (editing) {
            snapshot(section);
        } else if (restoreValues) {
            restore(section);
        }

        getFields(section).forEach(function (field) {
            field.disabled = !editing;
        });

        var actions = getActions(section);
        if (actions) actions.classList.toggle('dashboard-settings-form__actions--hidden', !editing);

        var edit = getEdit(root, sectionId);
        if (edit) {
            edit.classList.toggle('dashboard-settings-form__edit--hidden', editing);
            edit.hidden = editing;
        }

        var detail = { section: sectionId, restored: !!restoreValues };
        dispatch(
            root,
            editing ? 'sp:dashboard-settings-form:edit' : 'sp:dashboard-settings-form:close',
            detail
        );
        return true;
    }

    function save(root, sectionId) {
        var section = getSection(root, sectionId);
        if (!section) return false;

        getFields(section).forEach(function (field) {
            delete field.dataset.dashboardSettingsFormSnapshot;
            field.disabled = true;
        });

        var actions = getActions(section);
        if (actions) actions.classList.add('dashboard-settings-form__actions--hidden');

        var edit = getEdit(root, sectionId);
        if (edit) {
            edit.classList.remove('dashboard-settings-form__edit--hidden');
            edit.hidden = false;
        }

        dispatch(
            root,
            'sp:dashboard-settings-form:save',
            { section: sectionId }
        );
        return true;
    }

    function handleClick(root, event) {
        var edit = event.target.closest('[data-dashboard-settings-form-edit]');
        if (edit && root.contains(edit)) {
            event.preventDefault();
            setEditing(root, edit.getAttribute('data-dashboard-settings-form-edit'), true, false);
            return;
        }

        var cancel = event.target.closest('[data-dashboard-settings-form-cancel]');
        if (cancel && root.contains(cancel)) {
            event.preventDefault();
            setEditing(root, cancel.getAttribute('data-dashboard-settings-form-cancel'), false, true);
            return;
        }

        var saveTrigger = event.target.closest('[data-dashboard-settings-form-save]');
        if (saveTrigger && root.contains(saveTrigger)) {
            event.preventDefault();
            save(root, saveTrigger.getAttribute('data-dashboard-settings-form-save'));
        }
    }

    /** @public */
    function init(context) {
        findRoots(context).forEach(function (root) {
            if (root.__skillpressDashboardSettingsFormInitialized) return;
            root.__skillpressDashboardSettingsFormInitialized = true;
            root.addEventListener('click', function (event) {
                handleClick(root, event);
            });
        });
    }

    namespace.DashboardSettingsForm = {
        init: init,
        setEditing: setEditing,
        save: save
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
