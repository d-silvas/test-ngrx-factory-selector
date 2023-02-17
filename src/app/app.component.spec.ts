import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import * as selectors from './store/selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { select } from '@ngrx/store';
import { FeatureState } from './store/state';

describe('AppComponent', () => {
  let store: MockStore;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              // APPROACH #1 ONLY
              // We mock the parent selector
              selector: selectors.getFeatureState,
              value: { name: 'Mocked1' },
            },
          ],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectors', () => {
    it('APPROACH #1', (done: DoneFn) => {
      // !! This uses the real parent selector !! (See console logs)
      store.pipe(select(selectors.getName1('Test1'))).subscribe((s) => {
        // By mocking the parent selector (getFeatureState), we have complete control over what our selector (getName1) returns
        expect(s).toEqual('Test1 Mocked1');
        done();
      });
    });

    it('APPROACH #2', (done: DoneFn) => {
      // Spy directly on the function
      spyOn(selectors.factorySelectors, 'getName2').and.returnValue(
        ((_: FeatureState) => 'Mocked2') as any
      );
      store
        .pipe(select(selectors.factorySelectors.getName2('Test2')))
        .subscribe((s) => {
          expect(s).toEqual('Mocked2');
          done();
        });
    });

    it('APPROACH #3', (done: DoneFn) => {
      // Store the selector and override it
      store.overrideSelector(component.getName3Selector, 'Mocked3');
      store.refreshState();
      store.pipe(select(component.getName3Selector)).subscribe((s) => {
        expect(s).toEqual('Mocked3');
        done();
      });
    });
  });
});
